import {Injectable, signal} from '@angular/core';
import {Coordinate} from '../../../models/coordinate';
import {Feature, Geolocation} from 'ol';
import Map from 'ol/Map';
import {Point} from 'ol/geom';
import {Circle, Fill, Stroke, Style} from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';


@Injectable({
  providedIn: 'root',
})
export class LocationService {
  readonly isLocationEnabled = signal<boolean>(false);
  readonly userCoordinates = signal<Coordinate | null>(null);

  updateLocationStatus(enabled: boolean, coordinates: Coordinate | null) {
    this.isLocationEnabled.set(enabled);
    if (coordinates)
      this.userCoordinates.set(coordinates);
  }

  public setupGeolocation(map: Map) {
    const geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: map.getView().getProjection(),
    });

    geolocation.on('change:position', () => {
      const coordinates = geolocation.getPosition();
      if (coordinates) {
        // Aggiorna il signal globale
        this.updateLocationStatus(true, {
          lon: coordinates[0],
          lat: coordinates[1]
        });

        positionFeature.setGeometry(new Point(coordinates));
      }
    });

    geolocation.on('error', () => {
      this.updateLocationStatus(false, null);
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
      map: map,
      source: new VectorSource({
        features: [ positionFeature ],
      }),
      zIndex: 999 // Sopra a tutti gli altri layer
    });
  }
}
