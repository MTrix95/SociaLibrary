import {Injectable, signal} from '@angular/core';
import {Coordinate} from '../../shared/models/coordinate';

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
}
