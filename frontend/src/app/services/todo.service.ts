import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface Todo {
  id: number;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private api = 'http://127.0.0.1:8000/todos';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private authHeaders() {
    const token = this.auth.loadToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getMyTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.api}/my`, this.authHeaders());
  }

  createTodo(content: string): Observable<Todo> {
    return this.http.post<Todo>(`${this.api}/create`, { content }, this.authHeaders());
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`, this.authHeaders());
  }
}
