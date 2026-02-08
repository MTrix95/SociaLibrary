import {AfterViewInit, Component, computed, ElementRef, inject, ViewChild} from '@angular/core';
import Map from 'ol/Map';
import {View} from 'ol';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import {OSM, TileWMS} from 'ol/source';
import {defaults as defaultControls} from 'ol/control/defaults';
import ScaleLine from 'ol/control/ScaleLine';
import {ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {LocationService} from './services/location.service';

@Component({
  selector: 'app-map',
  imports: [
    ReactiveFormsModule,
    Toast
  ],
  providers: [ MessageService ],
  template: `
    <div class="relative h-screen w-full">
      <p-toast position="top-center" />
      <!-- MAP CONTAINER -->
      <div #mapContainer id="map" class="h-screen"></div>
    </div>
  `,
  styles: ``,
  standalone: true
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer')
  private mapContainer!: ElementRef<HTMLDivElement>;

  private map!: Map;
  private locationService: LocationService = inject(LocationService);
  private messageService: MessageService = inject(MessageService);

  private isLocationAvailable = computed(() => {
    return this.locationService.isLocationEnabled()
  });

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

    this.locationService.setupGeolocation(this.map);
    if(!this.isLocationAvailable()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Privacy e Posizione',
        detail: 'Senza l\'accesso alla posizione, la ricerca spaziale dei libri non sarà disponibile. Puoi comunque navigare la mappa manualmente.',
        sticky: true
      });
    }
  }

  /**
   * Crea il layer WMS che interroga GeoServer.
   * GeoServer gestirà internamente lo stile (SLD) e il clustering.
   */
  private createLibraryLayer(): TileLayer<TileWMS> {
    return new TileLayer({
      source: new TileWMS({
        url: '/geo/ows',
        params: {
          SERVICE: 'WMS',
          VERSION: '1.1.1',
          REQUEST: 'GetMap',
          LAYERS: 'SociaLibrary:books',
          TILED: true,
          FORMAT: 'image/png',
          TRANSPARENT: true
        },
        serverType: 'geoserver',
        transition: 0,
      }),
    });
  }
}
