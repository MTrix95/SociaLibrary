import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <!-- SEARCH BAR -->
    <div
      class="absolute left-1/2 bottom-12 z-40
         w-80 max-w-md sm:max-w-lg lg:max-w-xl
         bg-white/95 backdrop-blur-md border border-gray-200
         rounded-full shadow-lg
         transition-all duration-150
         hover:shadow-xl focus-within:shadow-xl focus-within:border-blue-100"
      style="transform: translateX(-50%)"
    >
      <div class="flex items-center px-4 py-3 gap-2">
        <i class="pi pi-search text-gray-400 shrink-0"></i>
        <input
          #searchInput
          [formControl]="searchControl"
          type="text"
          placeholder="Cerca per autore, titolo o ISBN"
          aria-label="barra di ricerca su mappa"
          autocomplete="off"
          class="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
        />
        <!-- CLEAR -->
        @if (searchControl.value) {
          <i class="pi pi-times text-gray-400 shrink-0 cursor-pointer" (click)="searchControl.reset()"></i>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class SearchComponent {
  protected searchControl = new FormControl('');
}
