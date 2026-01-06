import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
import Map from 'ol/Map';
import {Feature, Geolocation, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import {OSM, TileWMS} from 'ol/source';
import {defaults as defaultControls} from 'ol/control/defaults';
import ScaleLine from 'ol/control/ScaleLine';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchComponent} from './components/search/search.component';
import {Circle, Fill, Stroke, Style} from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {LocationService} from '../../../core/services/location.service';
import {Point} from 'ol/geom';

@Component({
  selector: 'app-map',
  imports: [
    ReactiveFormsModule,
    SearchComponent,
    Toast
  ],
  providers: [ MessageService ],
  template: `
    <div class="relative h-screen w-full">
      <p-toast position="top-center" />

      <!-- MAP CONTAINER -->
      <div #mapContainer id="map" class="h-screen">

      </div>
      <!-- SEARCH BAR -->
      <app-search/>
    </div>
  `,
  styles: ``,
  standalone: true
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;

  private map!: Map;
  private locationService: LocationService = inject(LocationService);
  private messageService: MessageService = inject(MessageService);

  ngAfterViewInit(): void {
    const scaleLine = new ScaleLine({
      units: 'metric',
    });

    this.map = new Map({
      view: new View({
        center: fromLonLat([16.871871, 41.117143]), // Bari
        zoom: 13
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.createLibraryLayer()
      ],
      controls: defaultControls().extend([scaleLine]),
      target: this.mapContainer.nativeElement
    })

    // Inizializzo la geolocalizzazione
    this.setupGeolocation();
  }

  private setupGeolocation() {
    const geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: this.map.getView().getProjection(),
    });

    geolocation.on('change:position', () => {
      const coordinates = geolocation.getPosition();
      if (coordinates) {
        // Aggiorna il signal globale
        this.locationService.updateLocationStatus(true, {
          lon: coordinates[0],
          lat: coordinates[1]
        });

        positionFeature.setGeometry(new Point(coordinates));
      }
    });

    geolocation.on('error', () => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Privacy e Posizione',
        detail: 'Senza l\'accesso alla posizione, la ricerca spaziale dei libri non sarà disponibile. Puoi comunque navigare la mappa manualmente.',
        sticky: true
      });
      this.locationService.updateLocationStatus(false, null);
    });

    // Avvia il tracciamento
    geolocation.setTracking(true);

    // Feature per il punto dell'utente
    const positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new Circle({
          radius: 6,
          scale: 1.3,
          fill: new Fill({ color: '#3399CC' }),
          stroke: new Stroke({ color: '#fff', width: 2 }),
        }),
      })
    );

    // Aggiungi il layer della posizione alla mappa
    new VectorLayer({
      map: this.map,
      source: new VectorSource({
        features: [ positionFeature ],
      }),
      zIndex: 999 // Sopra a tutti gli altri layer
    });
  }

  /**
   * Crea il layer WMS che interroga GeoServer.
   * GeoServer gestirà internamente lo stile (SLD) e il clustering.
   */
  private createLibraryLayer(): TileLayer<TileWMS> {
    return new TileLayer({
      source: new TileWMS({
        // In locale punterà al container geoserver tramite il proxy
        url: '/geoserver/wms',
        params: {
          'LAYERS': 'socialibrary:books_locations', // Il nome del layer su GeoServer
          'TILED': true,
          'FORMAT': 'image/png',
          'TRANSPARENT': true,
          'VERSION': '1.1.1'
        },
        serverType: 'geoserver',
        transition: 0,
      }),
    });
  }
}
