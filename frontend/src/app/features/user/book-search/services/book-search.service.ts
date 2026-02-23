import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Book} from '../../../../shared/models/book';
import {BookFilter} from '../../../../shared/models/book-filter';
import {Page} from '../../../../shared/models/page';

@Injectable({
  providedIn: 'root',
})
export class BookSearchService {
  private httpClient: HttpClient = inject(HttpClient);

  searchBooks(filters: BookFilter | null, page: number, size: number): Observable<Page<Book>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.post<Page<Book>>('/api/library/books/', filters ?? {}, { params });
  }
}
