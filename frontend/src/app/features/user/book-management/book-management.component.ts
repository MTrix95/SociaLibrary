import {Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { TabsModule } from 'primeng/tabs';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import { DatePipe } from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {Book, LoanStatus} from '../../../shared/models/book';
import {BookService} from './services/book-service';
import {UserProfile} from '../../../shared/models/user-profile';
import {AuthService} from '../../../core/services/auth.service';
import {MessageService} from 'primeng/api';
import {SearchFormComponent} from '../book-search/components/search-form/search-form.component';
import {SearchManagmentFormComponent} from './components/search-managment-form/search-managment-form.component';
import {BookFilter} from '../../../shared/models/book-filter';
import {Tag} from 'primeng/tag';


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
export class BookManagementComponent {
  private readonly bookService = inject(BookService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  protected userProfile: WritableSignal<UserProfile | null> = this.authService.userProfile;
  protected idUser: Signal<string> = computed(() => {
    return this.userProfile()?.sub || '';
  })

  protected loading: WritableSignal<boolean> = signal(false);
  protected books: WritableSignal<Book[]> = signal([]);
  protected totalRecords: WritableSignal<number> = signal(0);
  protected lastFilters: WritableSignal<BookFilter | null> = signal(null);

  protected first: number = 0;

  protected onSearchHandler(filters: BookFilter) {
    this.lastFilters.set(filters);
    this.first = 0;

    this.fetchData(0, 5, filters);
  }

  protected onOpenDetail(id?: string) {

  }

  protected onDeleteBook(id: string) {
    this.bookService.deleteBook(id)
      .subscribe({
        next: (result) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Libro eliminato con successo'
          });

          this.fetchData(0, 5, this.lastFilters());
        },
        error: (err) =>
          this.messageService.add({
            severity: 'error',
            summary: 'Info',
            detail: 'Non è stato possibile eliminare il libro:\n' + err.message
          })
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

    this.bookService.findBooksByUser(page, size, filters)
      .subscribe({
        next: (result) => {
          this.books.set(result.content);
          this.totalRecords.set(result.page.totalElements);

          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false)

          this.messageService.add({
            severity: 'error',
            summary: 'Info',
            detail: 'Non è stato caricare i libri dell\'utente'
          })
        }
      })
  }
}
