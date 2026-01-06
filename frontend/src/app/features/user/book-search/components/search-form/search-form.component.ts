import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Fieldset} from 'primeng/fieldset';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'app-search-form',
  imports: [
    FormsModule,
    InputText,
    Fieldset,
    DatePicker
  ],
  template: `
    <p-fieldset
      [toggleable]="true"
      [collapsed]="false"
      legend="Filtri"
      styleClass="rounded-xl! p-3! shadow-sm! border! border-gray-100! bg-white! overflow-hidden!"
    >
      <div class="flex flex-col gap-3">
        <!-- Riga 1 -->
        <div class="flex flex-col md:flex-row gap-4 w-full">
          <!-- 1/3: Titolo -->
          <div class="flex flex-col gap-1.5 flex-1">
            <label class="text-gray-400 text-[10px] uppercase font-bold ml-1 tracking-widest">Titolo Libro</label>
            <div class="relative">
              <i class="pi pi-book absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input pInputText placeholder="Titolo..."
                     class="w-full bg-gray-50! border-gray-200! text-gray-700! rounded-xl! p-3 pl-11 shadow-sm focus:border-gray-900!"/>
            </div>
          </div>

          <!-- 1/3: Editore (Il nuovo input) -->
          <div class="flex flex-col gap-1.5 flex-1">
            <label class="text-gray-400 text-[10px] uppercase font-bold ml-1 tracking-widest">Editore</label>
            <div class="relative">
              <i class="pi pi-building absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input pInputText placeholder="Casa editrice..."
                     class="w-full bg-gray-50! border-gray-200! text-gray-700! rounded-xl! p-3 pl-11 shadow-sm focus:border-gray-900!"/>
            </div>
          </div>

          <!-- 1/3: Autore -->
          <div class="flex flex-col gap-1.5 flex-1">
            <label class="text-gray-400 text-[10px] uppercase font-bold ml-1 tracking-widest">Autore</label>
            <div class="relative">
              <i class="pi pi-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input pInputText placeholder="Autore..."
                     class="w-full bg-gray-50! border-gray-200! text-gray-700! rounded-xl! p-3 pl-11 shadow-sm focus:border-gray-900!"/>
            </div>
          </div>
        </div>

        <!-- Riga 2: ISBN, Categoria e Anno -->
        <div class="flex flex-col md:flex-row gap-4 w-full">
          <div class="flex flex-col gap-1.5 flex-2">
            <label class="text-gray-400 text-[10px] uppercase font-bold ml-1 tracking-widest">Codice ISBN</label>
            <div class="relative">
              <i class="pi pi-barcode absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input pInputText placeholder="ISBN..."
                     class="w-full bg-gray-50! border-gray-200! text-gray-700! rounded-xl! p-3 pl-11 shadow-sm focus:border-gray-900!"/>
            </div>
          </div>
          <div class="flex flex-col gap-1.5 flex-2">
            <label class="text-gray-400 text-[10px] uppercase font-bold ml-1 tracking-widest">Categoria</label>
            <div class="relative">
              <i class="pi pi-tag absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input pInputText placeholder="Genere..."
                     class="w-full bg-gray-50! border-gray-200! text-gray-700! rounded-xl! p-3 pl-11 shadow-sm focus:border-gray-900!"/>
            </div>
          </div>
          <div class="flex flex-col gap-1.5 flex-1">
            <label class="text-gray-400 text-[10px] uppercase font-bold ml-1 tracking-widest">Data Pubblicazione</label>
            <div class="relative w-full"> <!-- Altezza fissa per bloccare il layout -->
              <!-- Icona con z-index più alto -->
              <i
                class="pi pi-calendar absolute left-4 top-1/2 -translate-y-1/2 z-20 text-gray-400 pointer-events-none"></i>
              <p-datepicker
                dateFormat="dd/mm/yy"
                placeholder="Seleziona data"
                [showIcon]="false"
                appendTo="body"
                [class]="'w-full'"
                inputStyleClass="w-full bg-gray-50! border-gray-200! text-gray-700! rounded-xl! p-3 pl-11 shadow-sm focus:border-gray-900!"></p-datepicker>
            </div>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="flex justify-end gap-3 pt-4 border-t border-gray-50">
          <button
            class="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer">
            Reset
          </button>
          <button
            class="px-5 py-3 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200 cursor-pointer flex items-center gap-2">
            <i class="pi pi-search"></i>
            Ricerca
          </button>
        </div>
      </div>
    </p-fieldset>
  `,
  styles: ``,
})
export class SearchFormComponent {

}
