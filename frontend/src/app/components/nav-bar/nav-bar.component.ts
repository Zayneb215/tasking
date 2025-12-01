import { Component } from '@angular/core';
import { NavLinkComponent } from '../nav-link/nav-link.component';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-nav-bar',
  imports: [NavLinkComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  links = [{ label: "Connexion", route: "/connexion"}, {label : "Inscription", route : "/inscription"}, {label : "Acceuil", route : "/"}]
  onLinkClicked (linkName : string) {
    console.log(linkName + " is Clicked !")
  }
}
