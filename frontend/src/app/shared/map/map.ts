import {AfterViewInit, Component, ElementRef} from '@angular/core';
import Map from 'ol/Map';
import {View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import {fromLonLat} from 'ol/proj';
import ControlScaleLine from 'ol/control/ScaleLine';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {Modal} from '../modal/modal';

@Component({
  selector: 'app-map',
  template: `
    <!-- MAP CONTAINER -->
    <div id="map" class="h-screen md:h-full lg:h-screen"></div>
    <div
      class="absolute left-1/2 bottom-12 z-40
         w-80 max-w-md sm:max-w-lg lg:max-w-xl
         bg-white/95 backdrop-blur-md border border-gray-200
         rounded-full shadow-lg
         transition-all duration-150
         hover:shadow-xl focus-within:shadow-xl focus-within:border-blue-400"
      style="transform: translateX(-50%)"
    >
      <div class="flex items-center px-4 py-3 gap-2">
        <mat-icon class="text-gray-400 flex-shrink-0">search</mat-icon>
        <input
          #searchInput
          [formControl]="searchControl"
          [matAutocomplete]="auto"
          type="text"
          placeholder="Cerca per autore, titolo o ISBN"
          aria-label="barra di ricerca su mappa"
          autocomplete="off"
          class="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
        />
        <!-- CLEAR -->
        @if (searchControl.value) {
          <mat-icon class="text-gray-400 flex-shrink-0 cursor-pointer" (click)="searchControl.reset()">close</mat-icon>
        }
        <!-- AUTOCOMPLETE -->
        <mat-autocomplete #auto="matAutocomplete" class="!bg-white bottom-12">
          @for (option of searchOptions; track option) {
            <mat-option [value]="option">{{option}}</mat-option>
          }
          <mat-option></mat-option>
        </mat-autocomplete>
      </div>
      <!-- SEARCH FIELD -->
    </div>`,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatIcon,
    MatIcon,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    Modal
  ],
  styles: []
})
export class MapComponent implements AfterViewInit {
  protected map?: Map;
  protected searchControl = new FormControl('');

  protected readonly searchOptions: string[] = [
    'Greenhund',
    'Harry Potter: L\'ordine della fenice',
    'Harry Potter: Il prigioniero di Azkaban',
  ];

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.map = new Map({
      view: new View({
        center: fromLonLat([16.871871, 41.117143]), // Bari
        zoom: 13
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      controls: [
        new ControlScaleLine({
          target: this.elementRef.nativeElement.querySelector('#map')
        }),
      ],
      target: this.elementRef.nativeElement.querySelector('#map')
    })
  }

}
