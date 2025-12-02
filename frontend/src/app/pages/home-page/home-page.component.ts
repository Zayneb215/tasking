import { Component, OnInit } from '@angular/core';
import { UserCardComponent, UserProfile } from '../../components/user-card/user-card.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  user! : UserProfile

  constructor(private auth: AuthService) {}
  
  ngOnInit(): void {
    this.user = this.auth.getProfile();
  }
}
