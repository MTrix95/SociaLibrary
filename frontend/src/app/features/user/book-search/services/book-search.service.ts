import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../../../../shared/models/book';
import {BookFilter} from '../../../../shared/models/book-filter';
import {Page} from '../../../../shared/models/page';
import {Category} from '../../../../shared/models/category';
import {LoanRequest} from '../../../../shared/models/loan-request';

@Injectable({
  providedIn: 'root',
})
export class BookSearchService {
  private httpClient: HttpClient = inject(HttpClient);

  findCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('/api/library/categories/');
  }

  searchBooks(filters: BookFilter | null, page: number, size: number): Observable<Page<Book>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.post<Page<Book>>('/api/library/books/', filters ?? {}, { params });
  }

  loanRequest(loanRequest: LoanRequest): Observable<void> {
    return this.httpClient.post<void>('/api/library/loan', loanRequest);
  }
}
