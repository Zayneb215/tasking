import { Component } from '@angular/core';
import { NavLinkComponent } from '../nav-link/nav-link.component';

@Component({
  selector: 'app-nav-bar',
  imports: [NavLinkComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  links = ["Connexion", "Inscription", "Acceuil"]
  onLinkClicked (linkName : string) {
    console.log(linkName + " is Clicked !")
  }
}
