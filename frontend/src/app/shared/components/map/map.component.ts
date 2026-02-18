import {AfterViewInit, Component, computed, effect, ElementRef, inject, OnDestroy, ViewChild,} from '@angular/core';
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
import {LIBRARY_WMS_PARAMS, LIBRARY_WMS_URL, MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM,} from './map.constants';

@Component({
  selector: 'app-map',
  imports: [ReactiveFormsModule, Toast],
  // MessageService è già fornito globalmente in app.config.ts
  template: `
    <div class="relative h-screen w-full">
      <p-toast position="top-center" />
      <div #mapContainer id="map" class="h-screen"></div>
    </div>
  `,
  styles: ``,
  standalone: true,
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer')
  private mapContainer!: ElementRef<HTMLDivElement>;

  private map: Map | null = null;
  private readonly locationService = inject(LocationService);
  private readonly messageService = inject(MessageService);

  private readonly isLocationAvailable = computed(() =>
    this.locationService.isLocationEnabled()
  );

  constructor() {
    this.setupLocationWarning();
  }

  ngAfterViewInit(): void {
    this.map = this.buildMap();
    this.locationService.setupGeolocation(this.map);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.setTarget(undefined);
      this.map = null;
    }
  }

  private setupLocationWarning(): void {
    effect(() => {
      debugger;
      if (!this.isLocationAvailable()) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Privacy e Posizione',
          detail:
            "Senza l'accesso alla posizione, la ricerca spaziale dei libri non sarà disponibile.",
          sticky: true,
        });
      }
    });
  }

  private buildMap(): Map {
    const map = new Map({
      view: new View({
        center: fromLonLat(MAP_DEFAULT_CENTER),
        zoom: MAP_DEFAULT_ZOOM,
      }),
      layers: [...this.createBaseLayers(), this.createLibraryLayer()],
      controls: this.createControls(),
      target: this.mapContainer.nativeElement,
    });
    return map;
  }

  private createBaseLayers(): TileLayer<OSM>[] {
    return [
      new TileLayer({
        source: new OSM(),
      }),
    ];
  }

  /**
   * Layer WMS che interroga GeoServer (stile SLD e clustering gestiti lato server).
   */
  private createLibraryLayer(): TileLayer<TileWMS> {
    return new TileLayer({
      source: new TileWMS({
        url: LIBRARY_WMS_URL,
        params: {
          ...LIBRARY_WMS_PARAMS,
        },
        serverType: 'geoserver',
        transition: 0,
      }),
    });
  }

  private createControls() {
    const scaleLine = new ScaleLine({ units: 'metric' });
    return defaultControls().extend([scaleLine]);
  }
}
