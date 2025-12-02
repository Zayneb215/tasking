import { Component, input } from '@angular/core';
import { UserInfoComponent } from '../content-area-components/user-info/user-info.component';
import { TodoListComponent } from '../content-area-components/todo-list/todo-list.component';
import { GamesListComponent } from '../content-area-components/games/games-list/games-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-area',
  imports: [CommonModule,GamesListComponent, UserInfoComponent, TodoListComponent],
  templateUrl: './content-area.component.html',
  styleUrl: './content-area.component.scss'
})
export class ContentAreaComponent {
  content = input<string>()
}
