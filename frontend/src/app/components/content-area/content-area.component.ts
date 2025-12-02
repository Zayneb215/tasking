import { Component } from '@angular/core';
import { UserInfoComponent } from '../content-area-components/user-info/user-info.component';
import { TodoListComponent } from '../content-area-components/todo-list/todo-list.component';

@Component({
  selector: 'app-content-area',
  imports: [TodoListComponent],
  templateUrl: './content-area.component.html',
  styleUrl: './content-area.component.scss'
})
export class ContentAreaComponent {

}
