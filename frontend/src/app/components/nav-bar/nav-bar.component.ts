import { Component } from '@angular/core';
import { NavLinkComponent } from '../nav-link/nav-link.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NavLinkComponent,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  loggedOutLinks = [
    { label: "Connexion", route: "/connexion" },
    { label: "Inscription", route: "/inscription" }
  ];

  loggedInLinks = [
    { label: "Acceuil", route: "/" },
    { label: "Logout", route: "/logout" }
  ];

  constructor(private auth: AuthService) {}

  get isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  onLinkClicked(linkName: string) {
    console.log(linkName + " is Clicked !");
  }
}
