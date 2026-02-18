import {Injectable, OnDestroy, signal} from '@angular/core';
import {Coordinate} from '../../../models/coordinate';
import {Feature, Geolocation} from 'ol';
import Map from 'ol/Map';
import {Point} from 'ol/geom';
import {Circle, Fill, Stroke, Style} from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {environment} from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class LocationService implements OnDestroy {
  readonly isLocationEnabled = signal<boolean>(false);
  readonly userCoordinates = signal<Coordinate | null>(null);

  private geolocation?: Geolocation;
  private positionLayer?: VectorLayer<VectorSource>;
  private positionFeature?: Feature<Point>;
  private positionChangeHandler?: () => void;
  private errorHandler?: () => void;

  ngOnDestroy(): void {
    this.stopTracking();
    this.cleanup();
  }

  /**
   * Verifica se l'API di geolocalizzazione è disponibile nel browser.
   */
  isGeolocationSupported(): boolean {
    return 'geolocation' in navigator;
  }

  /**
   * Configura e avvia il tracciamento della posizione dell'utente sulla mappa.
   * Se il tracciamento è già attivo, lo riavvia.
   */
  setupGeolocation(map: Map): void {
    if (!this.isGeolocationSupported()) {
      this.updateLocationStatus(false, null);
      return;
    }

    if (this.geolocation) {
      this.geolocation.setTracking(true);
      return;
    }

    this.initializeGeolocation(map);
    this.setupPositionLayer(map);
    this.setupEventHandlers();
    this.startTracking();
  }

  /**
   * Ferma il tracciamento della posizione.
   */
  stopTracking(): void {
    if (this.geolocation) {
      this.geolocation.setTracking(false);
    }
  }

  /**
   * Inizializza l'oggetto Geolocation di OpenLayers.
   */
  private initializeGeolocation(map: Map): void {
    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true
      },
      projection: map.getView().getProjection(),
    });
  }

  /**
   * Crea e aggiunge il layer vettoriale per visualizzare la posizione dell'utente.
   */
  private setupPositionLayer(map: Map): void {
    this.positionFeature = this.createPositionFeature();
    const source = new VectorSource({
      features: [this.positionFeature],
    });

    this.positionLayer = new VectorLayer({
      map: map,
      source: source,
      zIndex: 999,
    });
  }

  /**
   * Crea la feature che rappresenta la posizione dell'utente.
   */
  private createPositionFeature(): Feature<Point> {
    const feature = new Feature<Point>();
    feature.setStyle(this.createPositionStyle());
    return feature;
  }

  /**
   * Crea lo stile per il marker della posizione utente.
   */
  private createPositionStyle(): Style {
    return new Style({
      image: new Circle({
        radius: environment.MAP_USER_POSITION_STYLE.radius,
        fill: new Fill({
          color: environment.MAP_USER_POSITION_STYLE.fillColor,
        }),
        stroke: new Stroke({
          color: environment.MAP_USER_POSITION_STYLE.strokeColor,
          width: environment.MAP_USER_POSITION_STYLE.strokeWidth,
        }),
      }),
    });
  }

  /**
   * Configura gli event handler per gli eventi di geolocalizzazione.
   */
  private setupEventHandlers(): void {
    if (!this.geolocation || !this.positionFeature) {
      return;
    }

    this.positionChangeHandler = () => {
      this.handlePositionChange();
    };

    this.errorHandler = () => {
      this.handleGeolocationError();
    };

    this.geolocation.on('change:position', this.positionChangeHandler);
    this.geolocation.on('error', this.errorHandler);
  }

  /**
   * Gestisce l'evento di cambio posizione.
   */
  private handlePositionChange(): void {
    if (!this.geolocation || !this.positionFeature) {
      return;
    }

    const coordinates = this.geolocation.getPosition();
    if (coordinates) {
      const coordinate: Coordinate = {
        lon: coordinates[0],
        lat: coordinates[1],
      };

      this.updateLocationStatus(true, coordinate);
      this.positionFeature.setGeometry(new Point(coordinates));
    }
  }

  /**
   * Gestisce gli errori di geolocalizzazione.
   */
  private handleGeolocationError(): void {
    this.updateLocationStatus(false, null);
    if (this.geolocation) {
      this.geolocation.setTracking(false);
    }
  }

  /**
   * Avvia il tracciamento della posizione.
   */
  private startTracking(): void {
    if (this.geolocation) {
      this.geolocation.setTracking(true);
    }
  }

  /**
   * Aggiorna lo stato della geolocalizzazione e le coordinate dell'utente.
   */
  private updateLocationStatus(
    enabled: boolean,
    coordinates: Coordinate | null
  ): void {
    this.isLocationEnabled.set(enabled);
    if (coordinates) {
      this.userCoordinates.set(coordinates);
    } else {
      this.userCoordinates.set(null);
    }
  }

  /**
   * Pulisce le risorse allocate.
   */
  private cleanup(): void {
    if (this.positionLayer) {
      this.positionLayer.setMap(null);
      this.positionLayer = undefined;
    }

    if (this.geolocation) {
      if (this.positionChangeHandler) {
        this.geolocation.un('change:position', this.positionChangeHandler);
      }
      if (this.errorHandler) {
        this.geolocation.un('error', this.errorHandler);
      }
      this.geolocation = undefined;
    }

    this.positionFeature = undefined;
    this.positionChangeHandler = undefined;
    this.errorHandler = undefined;
  }
}
