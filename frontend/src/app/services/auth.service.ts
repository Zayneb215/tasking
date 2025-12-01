import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  token?: string; // optional if backend returns JWT
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO: change this to your real backend
  private api = 'https://localhost:8000/api';

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload) {
    return this.http.post<RegisterResponse>(`${this.api}/register`, payload)
      .pipe(
        catchError((err) => {
          console.error('Registration failed:', err);
          return throwError(() => err);
        })
      );
  }
}
