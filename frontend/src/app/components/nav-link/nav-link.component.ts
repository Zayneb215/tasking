import { Component, Input, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  imports: [],
  templateUrl: './nav-link.component.html',
  styleUrl: './nav-link.component.scss'
})
export class NavLinkComponent {
  linkName = input<string>("Link")
  route = input<string>("/")
  onLinkClicked = input<() => void>();
  constructor (private router: Router) {}
  triggerClick() {
    const fn = this.onLinkClicked();
    if (fn) fn();
    this.router.navigate([this.route()]);
  }
}
