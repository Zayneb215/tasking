import { Component } from '@angular/core';
import { NavLinkComponent } from '../nav-link/nav-link.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface RouteLink {
  label : string,
  route: string | undefined
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NavLinkComponent, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  loggedOutLinks : RouteLink[] = [
    { label: "Connexion", route: "/connexion" },
    { label: "Inscription", route: "/inscription" }
  ];

  loggedInLinks : RouteLink[] = [
    { label: "Acceuil", route: "/" },
    { label: "Logout", route: undefined },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  get isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout();         // remove token
    this.router.navigate(['/connexion']);  // redirect to login
  }

  onLinkClicked(linkName: string) {
    linkName === 'Logout' && this.logout()
  }
}
