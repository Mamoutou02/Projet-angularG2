import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCake,
  faCar,
  faCog,
  faCoins, faGear, faHamburger,
  faHome,
  faLayerGroup,
  faLightbulb,
  faList,
  faMedal,
  fas, faUser
} from '@fortawesome/free-solid-svg-icons';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './sidebar.html',
  standalone: true,
  styleUrl: './sidebar.css'
})
export class Sidebar {
  faCog = faCog;
  protected readonly faHome = faHome;
  protected readonly faLightbulb = faLightbulb;
  protected readonly fas = fas;
  protected readonly faMedal = faMedal;
  protected readonly faLayerGroup = faLayerGroup;
  protected readonly faList = faList;
  protected readonly faGear = faGear;


}
