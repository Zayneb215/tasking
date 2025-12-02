import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawgService } from '../../../../services/rawg.service';
import { TodoService } from '../../../../services/todo.service';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() game: any;

  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
  }

  addGameToPlay () {
    this.todoService.createTodo("Play this cool game : " + this.game.name).subscribe(() => {});
  }
}
