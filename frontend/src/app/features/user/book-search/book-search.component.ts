import {Component, inject} from '@angular/core';
import {BookListComponent} from './components/book-list/book-list.component';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {SearchFormComponent} from './components/search-form/search-form.component';

@Component({
  selector: 'app-book-search',
  imports: [
    SearchFormComponent,
    BookListComponent

  ],
  providers: [ DialogService ],
  template: `
    <div class="flex flex-col h-full max-h-[calc(90vh-120px)] bg-white">
      <!-- Contenuto -->
      <div class="flex-1 pr-2 flex flex-col gap-6 pt-2">
        <!-- Sezione Ricerca -->
        <div class="flex flex-col gap-1.5 w-full">
          <app-search-form></app-search-form>
        </div>

        <!-- Sezione Lista/Tabella -->
        <div class="flex flex-col gap-1.5 w-full mb-4 flex-1 min-h-0 pr-2">
          <label class="text-gray-400 text-[13px] uppercase font-bold ml-1 tracking-widest">Risultati</label>
          <div class="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <app-book-list></app-book-list>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end pt-6 pb-2 bg-white border-t border-gray-50 shrink-0">
        <button (click)="close()" class="px-5 py-3 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200 cursor-pointer flex items-center gap-2">
          <i class="pi pi-times"></i>
          Chiudi
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class BookSearchComponent {
  private ref = inject(DynamicDialogRef);

  close() {
    this.ref.close();
  }
}
