import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() onClicked!: (button_name : string) => void 
  
  onProfile () {
    this.onClicked("Profile")
  }

  onToDo () {
    this.onClicked("ToDo")
  }

  onGames () {
    this.onClicked("Games")
  }
}
