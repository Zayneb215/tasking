import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavLinkComponent } from './components/nav-link/nav-link.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavLinkComponent, HomePageComponent, LoginPageComponent, RegisterPageComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  Connexion = 'HiHello'
}
