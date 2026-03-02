import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private httpClient: HttpClient = inject(HttpClient);

  getCategoryStats() {
    return this.httpClient.get<any[]>('/api/library/stats/categories-distribution');
  }

  getUserStats() {
    return this.httpClient.get<any[]>('/api/administrator/users/stats');
  }
}
