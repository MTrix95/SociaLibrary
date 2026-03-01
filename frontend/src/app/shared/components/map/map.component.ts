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
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-map',
  imports: [ReactiveFormsModule, Toast],
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
    // Ascolta il signal e scatta in automatico
    effect(() => {
      const requestToZoom = this.locationService.zoomRequest();
      const isEnabled = this.isLocationAvailable();

      if(requestToZoom && this.map) {
        this.onZoom(requestToZoom.lon, requestToZoom.lat);
      }

      if (!isEnabled) {
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

  ngAfterViewInit(): void {
    this.map = this.buildMap();
    this.locationService.setupGeolocation(this.map);
  }

  ngOnDestroy(): void {
    if (this.map) {
      // Stoppo la geolocalizzazione
      this.locationService.stopTracking();

      this.map.setTarget(undefined);
      this.map = null;
    }
  }

  private onZoom(lon: number, lat: number) {
    if(this.map) {
      this.map.getView().animate({
        center: fromLonLat([lon, lat]),
        zoom: 17,
        duration: 1000
      })
    }
  }

  private buildMap(): Map {
    return new Map({
      view: new View({
        center: fromLonLat(environment.MAP_DEFAULT_CENTER),
        zoom: environment.MAP_DEFAULT_ZOOM,
      }),
      layers: [...this.createBaseLayers(), this.createQuartieriLayer(), this.createLibraryLayer()],
      controls: this.createControls(),
      target: this.mapContainer.nativeElement,
    });
  }

  private createBaseLayers(): TileLayer<OSM>[] {
    return [
      new TileLayer({
        source: new OSM(),
      }),
    ];
  }

  private createQuartieriLayer(): TileLayer<TileWMS> {
    return new TileLayer({
      source: new TileWMS({
        url: environment.MAP_LIBRARY_WMS_URL,
        params: {
          SERVICE: 'WMS',
          VERSION: '1.1.1',
          REQUEST: 'GetMap',
          LAYERS: 'SociaLibrary:quartieri',
          TILED: true,
          FORMAT: 'image/png',
          TRANSPARENT: true,
        }
      })
    });
  }

  /**
   * Layer WMS che interroga GeoServer.
   */
  private createLibraryLayer(): TileLayer<TileWMS> {
    return new TileLayer({
      source: new TileWMS({
        url: environment.MAP_LIBRARY_WMS_URL,
        params: {
          ...environment.MAP_LIBRARY_WMS_PARAMS,
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
