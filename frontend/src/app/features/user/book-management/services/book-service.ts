import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../../../../shared/models/page';
import {Book} from '../../../../shared/models/book';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private httpClient = inject(HttpClient);

  findBooksByUser(idUser: string, page: number, size: number): Observable<Page<Book>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.get<Page<Book>>(`/api/library/books/user/${idUser}`, { params });
  }

  deleteBook(idBook: string) {
    return this.httpClient.delete(`/api/library/books/${idBook}`);
  }
}
