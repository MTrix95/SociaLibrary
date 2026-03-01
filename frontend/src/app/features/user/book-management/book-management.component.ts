import {Component, computed, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { TabsModule } from 'primeng/tabs';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import { DatePipe } from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {Book} from '../../../shared/models/book';
import {BookService} from './services/book-service';
import {AuthService} from '../../../core/services/auth.service';
import {MessageService} from 'primeng/api';
import {SearchManagmentFormComponent} from './components/search-managment-form/search-managment-form.component';
import {BookFilter} from '../../../shared/models/book-filter';
import {Tag} from 'primeng/tag';
import {BookDetailComponent} from '../book-detail/book-detail.component';
import {FooterComponent} from '../../../shared/components/dialog/components/footer/footer.component';
import {Category} from '../../../shared/models/category';
import {BookSearchService} from '../book-search/services/book-search.service';


@Component({
  selector: 'app-book-management',
  imports: [
    TabsModule,
    TableModule,
    DatePipe,
    Tooltip,
    SearchManagmentFormComponent,
    Tag,
  ],
  providers: [ DialogService ],
  templateUrl: './book-management.component.html',
})
export class BookManagementComponent implements OnInit {
  private _bookService = inject(BookService);
  private _bookSearchService = inject(BookSearchService);
  private _authService: AuthService = inject(AuthService);
  private _messageService = inject(MessageService);
  private _dialogService = inject(DialogService);

  protected idUser: Signal<string> = computed(() => {
    return this._authService.userProfile()?.sub || '';
  });

  protected loading: WritableSignal<boolean> = signal(false);
  protected books: WritableSignal<Book[]> = signal([]);
  protected totalRecords: WritableSignal<number> = signal(0);
  protected lastFilters: WritableSignal<BookFilter | null> = signal(null);

  protected first: number = 0;

  public categories: WritableSignal<Category[]> = signal([]);
  ngOnInit(): void {
    this._bookSearchService.findCategories().subscribe({
      next: (result) => {
        if(result) {
          this.categories.set(result);
        }
      }
    })
  }

  protected onSearchHandler(filters: BookFilter) {
    this.lastFilters.set(filters);
    this.first = 0;

    this.fetchData(0, 5, filters);
  }

  protected onOpenDetail(id?: string) {
    this._dialogService.open(BookDetailComponent, {
      header: 'Dettaglio',
      data: {
        bookID: id,
        footerConfig: {
          showSaveButton: true,
          showCloseButton: true,
        }
      },
      width: '80vw',      // Larghezza ampia dato che contiene ricerca e lista
      height: '90vh',     // Altezza quasi a tutto schermo
      contentStyle: {
        'padding': '0 1.5rem',
        'display': 'flex',
        'flex-direction': 'column',
        'height': '100%'
      },
      position: 'topright', // Verrà posizionato al centro della pagina
      baseZIndex: 10000,
      modal: false, // Evito che ci sia l'overlay dietro alla modale
      maximizable: true,   // Permette all'utente di espandere la
      resizable: false, // Non permette all'utente di ridimensionare la modale
      closable: true,
      duplicate: false,
      templates: {
        footer: FooterComponent
      }
    });
  }

  protected onDeleteBook(id: string) {
    this._bookService.deleteBook(id)
      .subscribe({
        next: () => {
          this._messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Libro eliminato con successo'
          });

          this.fetchData(0, 5, this.lastFilters());
        },
        error: (err) => console.error(err)
      })
  }

  protected onLazyLoadHandler(event: TableLazyLoadEvent) {
    const offset = event.first ?? 0;
    const rows = event.rows ?? 5;
    const page = offset / rows;

    const currentFilters = { ...this.lastFilters() };
    currentFilters.userID = this.idUser();

    this.first = offset;
    this.fetchData(page, rows, currentFilters);
  }

  private fetchData(page: number, size: number, filters: BookFilter | null) {
    this.loading.set(true);

    this._bookService.findBooksByUser(page, size, filters)
      .subscribe({
        next: (result) => {
          this.books.set(result.content);
          this.totalRecords.set(result.page.totalElements);

          this.loading.set(false);
        },
        error: (err) => this.loading.set(false)
      })
  }
}
