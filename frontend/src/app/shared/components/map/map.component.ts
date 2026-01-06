import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import Map from 'ol/Map';
import {Feature, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import {Cluster, OSM, TileWMS} from 'ol/source';
import {defaults as defaultControls} from 'ol/control/defaults';
import ScaleLine from 'ol/control/ScaleLine';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchComponent} from './components/search/search.component';
import VectorLayer from 'ol/layer/Vector';
import {Point} from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {MousePosition} from 'ol/control';
import {createStringXY} from 'ol/coordinate';

@Component({
  selector: 'app-map',
  imports: [
    ReactiveFormsModule,
    SearchComponent
  ],
  template: `
    <div class="relative h-screen w-full">
      <!-- MAP CONTAINER -->
      <div #mapContainer id="map" class="h-screen"></div>
      <!-- SEARCH BAR -->
      <app-search/>
    </div>
  `,
  styles: ``,
  standalone: true
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    const mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(6),
      projection: 'EPSG:4326',
    })
    const scaleLine = new ScaleLine({
      units: 'metric',
    });

    new Map({
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
