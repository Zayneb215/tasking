import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-nav-link',
  imports: [],
  templateUrl: './nav-link.component.html',
  styleUrl: './nav-link.component.scss'
})
export class NavLinkComponent {
  linkName = input<string>("Link")
  onLinkClicked = input<() => void>();

  triggerOnLinkClicked() {
      const fn = this.onLinkClicked();
      if (fn) fn();
    }
}
