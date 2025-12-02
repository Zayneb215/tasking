import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../../services/todo.service';
import { RawgService } from '../../../services/rawg.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo = '';

  constructor(private todoService: TodoService, private gamesService : RawgService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getMyTodos().subscribe(t => this.todos = t);
  }

  addTodo() {
    if (!this.newTodo.trim()) return;

    this.todoService.createTodo(this.newTodo).subscribe(() => {
      this.newTodo = '';
      this.loadTodos();
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }
}
