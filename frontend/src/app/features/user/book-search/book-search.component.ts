import {Component, inject, signal, WritableSignal} from '@angular/core';
import {BookListComponent} from './components/book-list/book-list.component';
import {DialogService} from 'primeng/dynamicdialog';
import {SearchFormComponent} from './components/search-form/search-form.component';
import {BookFilter} from '../../../shared/models/book-filter';
import {BookSearchService} from './services/book-search.service';
import {Book} from '../../../shared/models/book';
import {TableLazyLoadEvent} from 'primeng/table';

@Component({
  selector: 'app-book-search',
  imports: [
    SearchFormComponent,
    BookListComponent
  ],
  providers: [ DialogService ],
  templateUrl: './book-search.component.html',
})
export class BookSearchComponent {
  private bookSearchService: BookSearchService = inject(BookSearchService);

  public books = signal<Book[]>([]);
  public totalRecords = signal<number>(0);
  public isLoading = signal<boolean>(false);
  public first = signal<number>(0);

  private lastFilters = signal<BookFilter | null>(null);

  protected onSearchHandler(filters: BookFilter) {
    this.lastFilters.set(filters);
    this.first.set(0);
    this.fetchData(0, 5, filters);
  }

  protected onLazyLoadHandler(event: TableLazyLoadEvent) {
    const offset = event.first ?? 0;
    const rows = event.rows ?? 5;
    const page = offset / rows;

    this.first.set(offset);

    // Chiamata al server con i filtri salvati
    this.fetchData(page, rows, this.lastFilters());
  }

  private fetchData(page: number, size: number, filters: BookFilter | null) {
    this.isLoading.set(true);

    this.bookSearchService.searchBooks(filters, page, size)
      .subscribe({
        next: (result) => {
          this.books.set(result.content);
          this.totalRecords.set(result.page.totalElements);

          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false)
      });
  }
}
