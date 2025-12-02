import { Component } from '@angular/core';
import { UserInfoComponent } from '../content-area-components/user-info/user-info.component';

@Component({
  selector: 'app-content-area',
  imports: [UserInfoComponent],
  templateUrl: './content-area.component.html',
  styleUrl: './content-area.component.scss'
})
export class ContentAreaComponent {

}
