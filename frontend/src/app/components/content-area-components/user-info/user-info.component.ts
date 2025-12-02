import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { UserProfile } from '../../user-card/user-card.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user! : UserProfile
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.getProfile();
  }
}
