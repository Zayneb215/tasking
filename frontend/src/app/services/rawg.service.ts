import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawgService {

  private baseUrl = 'https://api.rawg.io/api';
  private apiKey = '1dca29a933d1415399cd28e8f2c9a0ce';

  constructor(private http: HttpClient) {}

  /** Get list of games */
  getGames(page: number = 1, pageSize: number = 20): Observable<any> {
    let params = new HttpParams()
      .set('key', this.apiKey)
      .set('page', page)
      .set('page_size', pageSize);

    return this.http.get(`${this.baseUrl}/games`, { params });
  }

  /** Search games by name */
  searchGames(query: string): Observable<any> {
    let params = new HttpParams()
      .set('key', this.apiKey)
      .set('search', query);

    return this.http.get(`${this.baseUrl}/games`, { params });
  }

  /** Get game detail by ID */
  getGameDetails(id: number): Observable<any> {
    let params = new HttpParams().set('key', this.apiKey);

    return this.http.get(`${this.baseUrl}/games/${id}`, { params });
  }

  /** Get game screenshots */
  getGameScreenshots(id: number): Observable<any> {
    let params = new HttpParams().set('key', this.apiKey);

    return this.http.get(`${this.baseUrl}/games/${id}/screenshots`, { params });
  }

  /** Get genres list */
  getGenres(): Observable<any> {
    let params = new HttpParams().set('key', this.apiKey);

    return this.http.get(`${this.baseUrl}/genres`, { params });
  }
}
