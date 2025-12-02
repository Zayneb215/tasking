import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, map } from 'rxjs';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://127.0.0.1:8000/auth';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  // ------------------------------
  // REGISTER
  // ------------------------------
  register(payload: RegisterPayload) {
    return this.http.post<RegisterResponse>(`${this.api}/register`, payload).pipe(
      map((res) => {
        if (res.token) {
          this.saveToken(res.token);
        }
        return res;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  // ------------------------------
  // TOKEN FUNCTIONS
  // ------------------------------
  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  loadToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  // ------------------------------
  // JWT DECODING
  // ------------------------------
  private decodePayload(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (e) {
      console.error('Failed to decode JWT', e);
      return null;
    }
  }

  // ------------------------------
  // GET USER PROFILE FROM TOKEN
  // ------------------------------
  getProfile() {
    const token = this.loadToken();
    if (!token) return null;
    return this.decodePayload(token);
  }

  // ------------------------------
  // AUTH STATE
  // ------------------------------
  isAuthenticated(): boolean {
    const token = this.loadToken();
    if (!token) return false;

    const payload = this.decodePayload(token);
    if (!payload || !payload.exp) return false;

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  }

  // ------------------------------
  // LOGOUT STATE
  // ------------------------------
  login(payload: { email: string; password: string }) {
      return this.http.post<{ token: string }>(`${this.api}/login`, payload).pipe(
        map((res) => {
          if (res.token) {
            this.saveToken(res.token);
          }
          return res;
        }),
        catchError((err) => throwError(() => err))
    );
  }

  // ------------------------------
  // LOGOUT
  // ------------------------------
  logout() {
    this.removeToken();
  }
}
