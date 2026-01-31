import {Component, inject, input, InputSignal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Tooltip} from 'primeng/tooltip';
import {Book} from '../../../../../shared/models/book';
import {DatePipe} from '@angular/common';
import {DialogService} from 'primeng/dynamicdialog';
import {BookDetailComponent} from '../../../book-detail/book-detail.component';
import {FooterComponent} from '../../../../../shared/components/dialog/components/footer/footer.component';

@Component({
  selector: 'app-book-list',
  imports: [
    TableModule,
    Tooltip,
    DatePipe
  ],
  providers: [ DialogService ],
  template: `
    <p-table
      [value]="booksList()"
      [rows]="5"
      [paginator]="true"
      [scrollable]="true"
      [tableStyleClass]="'h-full'"
      scrollHeight="flex"
    >
      <!-- Template header -->
      <ng-template #header>
        <tr class="bg-gray-50! border-b  border-gray-100">
          <th class="library-table-header">ISBN</th>
          <th class="library-table-header">Titolo</th>
          <th class="library-table-header">Autore</th>
          <th class="library-table-header">Editore</th>
          <th class="library-table-header">Data pubblicazione</th>
          <th class="library-table-header text-center">Azioni</th>
        </tr>
      </ng-template>

      <!-- Template table -->
      <ng-template #body let-book>
        <tr class="hover:bg-gray-50/50 border-b border-gray-50">
          <td class="library-table-cell text-gray-500 font-mono text-xs">{{ book.isbn }}</td>
          <td class="library-table-cell font-medium text-gray-900">{{ book.title }}</td>
          <td class="library-table-cell text-gray-600">{{ book.author }}</td>
          <td class="library-table-cell text-gray-600">{{ book.publisher }}</td>
          <td class="library-table-cell text-gray-600 w-45">{{ book.publishedDate | date:'dd/MM/yyyy' }}</td>
          <td class="library-table-cell text-center">
            <button (click)="onOpenDetail(book)" pTooltip="Apri dettaglio"
                    tooltipPosition="top"
                    class="p-2 text-gray-400 hover:text-gray-900 cursor-pointer">
              <i class="pi pi-ellipsis-v"></i>
            </button>
            <button pTooltip="Visualizza in mappa"
                    tooltipPosition="top"
                    [disabled]="!book.location"
                    class="p-2 text-gray-400 cursor-pointer disabled:opacity-40 disabled:cursor-default not-disabled:hover:text-gray-900">
              <i class="pi pi-map-marker"></i>
            </button>
          </td>
        </tr>
      </ng-template>

      <!-- Template per lista vuota -->
      <ng-template #emptymessage>
        <tr>
          <td colspan="6" class="text-center py-12!">
            <div class="flex flex-col items-center gap-2">
              <i class="pi pi-search text-gray-300 text-3xl"></i>
              <span class="text-gray-400 text-sm">Nessun libro trovato</span>
            </div>
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: ``,
})
export class BookListComponent {
  private dialogService: DialogService = inject(DialogService);

  public booksList: InputSignal<Book[]> = input<Book[]>([]);

  protected onOpenDetail(book: Book) {
    this.dialogService.open(BookDetailComponent, {
      header: 'Dettaglio',
      data: {
        isSaveEnabled: true,
      },
      width: '80vw',      // Larghezza ampia dato che contiene ricerca e lista
      height: '90vh',     // Altezza quasi a tutto schermo
      contentStyle: { 'padding': '0 1.5rem', 'height': '100%' },
      position: 'topright', // Verrà posizionato al centro della pagina
      baseZIndex: 10000,
      modal: false, // Evito che ci sia l'overlay dietro alla modale
      maximizable: true,   // Permette all'utente di espandere la
      resizable: false, // Non permette all'utente di ridimensionare la modale
      closable: true,
      templates: {
        footer: FooterComponent
      }
    });
  }
}
