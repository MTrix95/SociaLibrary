import {Component, inject, signal} from '@angular/core';
import {BookService} from '../../../book-management/services/book-service';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-book-list',
  imports: [
    TableModule
  ],
  template: `
    <p-table
      [value]="books()"
      [rows]="10"
      [paginator]="true"
    >
      <ng-template pTemplate="header">
        <tr class="bg-gray-50! border-b border-gray-100">
          <th class="bg-transparent! text-gray-400! text-[11px]! uppercase! font-bold! tracking-widest! py-4!">Titolo</th>
          <th class="bg-transparent! text-gray-400! text-[11px]! uppercase! font-bold! tracking-widest! py-4!">Autore</th>
          <th class="bg-transparent! text-gray-400! text-[11px]! uppercase! font-bold! tracking-widest! py-4!">ISBN</th>
          <th class="bg-transparent! text-gray-400! text-[11px]! uppercase! font-bold! tracking-widest! py-4! text-center">Azioni</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-book>
        <tr class="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
          <td class="py-4! text-sm font-medium text-gray-900">{{ book.title }}</td>
          <td class="py-4! text-sm text-gray-600">{{ book.author }}</td>
          <td class="py-4! text-gray-500 font-mono text-xs">{{ book.isbn }}</td>
          <td class="py-4! text-center">
            <button class="p-2 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer">
              <i class="pi pi-ellipsis-v"></i>
            </button>
          </td>
        </tr>
      </ng-template>

      <!-- Template per lista vuota -->
      <ng-template pTemplate="emptymessage">
        <tr>
          <td colspan="4" class="text-center py-12!">
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
  private bookService: BookService = inject(BookService);

  protected books = signal<any[]>([
    { title: 'Il Nome della Rosa', author: 'Umberto Eco', isbn: '978-8845278655' },
    { title: '1984', author: 'George Orwell', isbn: '978-0451524935' }
  ]);
}
