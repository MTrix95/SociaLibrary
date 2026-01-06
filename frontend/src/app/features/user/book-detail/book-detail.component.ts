import {Component, inject} from '@angular/core';
import {BookService} from '../book-management/services/book-service';

@Component({
  selector: 'app-book-detail',
  imports: [],
  template: `
    <p>
      book-detail works!
    </p>
  `,
  styles: ``,
})
export class BookDetailComponent {
  private bookService: BookService = inject(BookService);
}
