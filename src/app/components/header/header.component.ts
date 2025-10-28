import { Component } from '@angular/core';
import { NAV_BUTTONS } from 'src/app/configurations/constants/nav-buttons.constant';
import { INavLink } from 'src/app/configurations/models/nav-link.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navButtons: INavLink[] = NAV_BUTTONS;
  constructor() {}
}
