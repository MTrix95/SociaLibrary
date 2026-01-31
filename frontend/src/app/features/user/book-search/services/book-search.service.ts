import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Book} from '../../../../shared/models/book';
import {BookFilter} from '../../../../shared/models/book-filter';

@Injectable({
  providedIn: 'root',
})
export class BookSearchService {
  private httpClient: HttpClient = inject(HttpClient);

  searchBooks(filters: BookFilter): Observable<Book[]> {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if(value != null) {
        if (typeof value === 'object' && key === 'location') {
          params = params.append('lat', value.latitude).append('lon', value.longitude);
        } else {
          params = params.append(key, value.toString());
        }
      }
    });

    return this.httpClient.get<Book[]>(`/api/library/search`, { params });
  }
}
