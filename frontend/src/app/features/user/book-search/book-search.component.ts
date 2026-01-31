import {Component, inject, signal, WritableSignal} from '@angular/core';
import {BookListComponent} from './components/book-list/book-list.component';
import {DialogService} from 'primeng/dynamicdialog';
import {SearchFormComponent} from './components/search-form/search-form.component';
import {BookFilter} from '../../../shared/models/book-filter';
import {BookSearchService} from './services/book-search.service';
import {Book} from '../../../shared/models/book';

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
      <div class="flex-1 flex flex-col gap-6 h-full">
        <!-- Sezione Ricerca -->
        <div class="flex flex-col gap-1.5 w-full">
          <app-search-form (searchFilter)="onSearchHandler($event)"></app-search-form>
        </div>

        <!-- Sezione Lista/Tabella -->
        <div class="flex h-full flex-col gap-1.5 w-full mb-4 min-h-0">
          <label class="text-gray-400 text-[13px] uppercase font-bold ml-1 tracking-widest">Risultati</label>
          <div class="rounded-xl flex-1 border border-gray-100 overflow-hidden shadow-sm">
            <app-book-list [booksList]="books()"></app-book-list>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class BookSearchComponent {
  private bookSearchService: BookSearchService = inject(BookSearchService);

  protected books = signal<Book[]>([]);

  protected onSearchHandler(filters: BookFilter) {
    this.books.set([
      {
        id: '1',
        title: 'Introduzione a Angular',
        author: 'Mario Rossi',
        genre: 'Tecnologia',
        isbn: '9788800000001',
        publisher: 'Editore Tecnico Italiano',
        publishedDate: new Date('2022-03-15'),
        location: { lat: 41.1171, lon: 16.8719 } // Bari
      },
      {
        id: '2',
        title: 'Spring Boot per Java Developer',
        author: 'Luca Bianchi',
        genre: 'Tecnologia',
        isbn: '9788800000002',
        publisher: 'Java Press',
        publishedDate: new Date('2021-11-02'),
        location: { lat: 45.4642, lon: 9.1900 } // Milano
      },
      {
        id: '3',
        title: 'Microservizi in pratica',
        author: 'Giulia Verdi',
        genre: 'Tecnologia',
        isbn: '9788800000003',
        publisher: 'Architetture Moderne',
        publishedDate: new Date('2020-09-10'),
        location: { lat: 41.9028, lon: 12.4964 } // Roma
      },
      {
        id: '4',
        title: 'Geospatial Web Apps',
        author: 'Andrea Neri',
        genre: 'Tecnologia',
        isbn: '9788800000004',
        publisher: 'GeoDev Publishing',
        publishedDate: new Date('2023-01-25'),
        location: { lat: 40.8518, lon: 14.2681 } // Napoli
      },
      {
        id: '5',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        genre: 'Tecnologia',
        isbn: '9780132350884',
        publisher: 'Prentice Hall',
        publishedDate: new Date('2008-08-11'),
      },
      {
        id: '6',
        title: 'Domain-Driven Design',
        author: 'Eric Evans',
        genre: 'Tecnologia',
        isbn: '9780321125217',
        publisher: 'Addison-Wesley',
        publishedDate: new Date('2003-08-30'),
        location: { lat: 44.4949, lon: 11.3426 } // Bologna
      },
      {
        id: '7',
        title: 'Patterns of Enterprise Application Architecture',
        author: 'Martin Fowler',
        genre: 'Tecnologia',
        isbn: '9780321127426',
        publisher: 'Addison-Wesley',
        publishedDate: new Date('2002-11-15'),
        location: { lat: 43.7696, lon: 11.2558 } // Firenze
      },
      {
        id: '8',
        title: 'Progettare API REST',
        author: 'Sara Conti',
        genre: 'Tecnologia',
        isbn: '9788800000008',
        publisher: 'API Design Press',
        publishedDate: new Date('2021-05-19'),
        location: { lat: 45.4384, lon: 10.9916 } // Verona
      },
      {
        id: '9',
        title: 'Docker e Kubernetes',
        author: 'Fabio De Angelis',
        genre: 'Tecnologia',
        isbn: '9788800000009',
        publisher: 'Cloud Native Italia',
        publishedDate: new Date('2022-07-07'),
        location: { lat: 44.4056, lon: 8.9463 } // Genova
      },
      {
        id: '10',
        title: 'Introduzione a PostGIS',
        author: 'Chiara Gallo',
        genre: 'Tecnologia',
        isbn: '9788800000010',
        publisher: 'GeoData Press',
        publishedDate: new Date('2019-12-03'),
        location: { lat: 39.2238, lon: 9.1217 } // Cagliari
      }
    ]);
    this.bookSearchService.searchBooks(filters).subscribe((result) => {
      //this.books.set(result)
    });
  }
}
