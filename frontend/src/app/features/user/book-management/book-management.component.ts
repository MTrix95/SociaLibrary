import {Component, inject, signal, WritableSignal} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { TabsModule } from 'primeng/tabs';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import { DatePipe } from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {Book} from '../../../shared/models/book';
import {BookService} from './services/book-service';
import {UserProfile} from '../../../shared/models/user-profile';
import {AuthService} from '../../../core/services/auth.service';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-book-management',
  imports: [
    TabsModule,
    TableModule,
    DatePipe,
    Tooltip,
  ],
  providers: [ DialogService ],
  templateUrl: './book-management.component.html',
})
export class BookManagementComponent {
  private readonly bookService = inject(BookService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  protected userProfile: WritableSignal<UserProfile | null> = this.authService.userProfile;

  protected loading: WritableSignal<boolean> = signal(false);
  protected books: WritableSignal<Book[]> = signal([]);
  protected totalRecords: WritableSignal<number> = signal(0);

  protected first: number = 0;

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
          })
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
    const rows = event.rows ?? 10;
    const page = offset / rows;

    this.first = offset;
    const profile = this.userProfile();
    // Esegue la richiesta solo se l'utente è loggato
    if(profile?.sub) {
      this.fetchData(profile.sub, page, rows);
    }
  }

  private fetchData(idUser: string, page: number, size: number) {
    this.loading.set(true);

    this.bookService.findBooksByUser(idUser, page, size)
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
