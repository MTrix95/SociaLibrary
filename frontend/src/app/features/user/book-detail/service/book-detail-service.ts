import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../../../../shared/models/book';
import {Category} from '../../../../shared/models/category';

@Injectable({
  providedIn: 'root',
})
export class BookDetailService {
  private httpClient: HttpClient = inject(HttpClient);

  findBook(bookID: string): Observable<Book> {
    return this.httpClient.get<Book>(`/api/library/books/${bookID}`);
  }

  saveBook(formData: FormData): Observable<Book> {
    return this.httpClient.post<Book>('/api/library/books/', formData);
  }

  updateBook(formData: FormData): Observable<Book> {
    return this.httpClient.put<Book>('api/library/books/', formData);
  }

}
