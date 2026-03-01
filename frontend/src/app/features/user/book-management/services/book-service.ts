import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../../../../shared/models/page';
import {Book, LoanStatus} from '../../../../shared/models/book';
import {Observable} from 'rxjs';
import {BookFilter} from '../../../../shared/models/book-filter';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private httpClient = inject(HttpClient);

  findBooksByUser(page: number, size: number, filters: BookFilter | null): Observable<Page<Book>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.post<Page<Book>>('/api/library/books/', filters ?? {}, { params });
  }

  deleteBook(idBook: string): Observable<any> {
    return this.httpClient.delete(`/api/library/books/${idBook}`);
  }
}
