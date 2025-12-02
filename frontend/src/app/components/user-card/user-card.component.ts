import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UserProfile {
  id?: string;
  username?: string;
  email?: string;
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: UserProfile;
}
