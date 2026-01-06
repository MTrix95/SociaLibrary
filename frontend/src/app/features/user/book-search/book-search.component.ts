import {Component, inject} from '@angular/core';
import {BookListComponent} from './components/book-list/book-list.component';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {SearchFormComponent} from './components/search-form/search-form.component';
import {BookSearchFilter} from '../../../shared/models/book-search-filter';
import {BookSearchService} from './services/book-search.service';

@Component({
  selector: 'app-book-search',
  imports: [
    SearchFormComponent,
    BookListComponent

  ],
  providers: [ DialogService ],
  template: `
    <div class="flex flex-col h-full bg-white">
      <!-- Contenuto -->
      <div class="flex-1 flex flex-col gap-6">
        <!-- Sezione Ricerca -->
        <div class="flex flex-col gap-1.5 w-full">
          <app-search-form (searchFilter)="onSearchHandler($event)"></app-search-form>
        </div>

        <!-- Sezione Lista/Tabella -->
        <div class="flex flex-col gap-1.5 w-full mb-4 flex-1 min-h-0">
          <label class="text-gray-400 text-[13px] uppercase font-bold ml-1 tracking-widest">Risultati</label>
          <div class="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <app-book-list></app-book-list>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end">
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
  private bookSearchService: BookSearchService = inject(BookSearchService);

  close() {
    this.ref.close();
  }

  protected onSearchHandler(filters: BookSearchFilter) {

  }
}
