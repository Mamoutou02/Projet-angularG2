import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Component} from '@angular/core';
import {
  faHome,
  faLightbulb,
  faShare,
  faShareAlt,
  faTable,
  faTrophy,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-contributeurs',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FontAwesomeModule],
  templateUrl: './sidebar-contributeurs.html',
  styleUrl: './sidebar-contributeurs.css'
})
export class SidebarContributeurs {

  protected readonly faUserCircle = faUserCircle;
  protected readonly faHome = faHome;
  protected readonly faShare = faShare;
  protected readonly faLightbulb = faLightbulb;
  protected readonly faShareAlt = faShareAlt;
  protected readonly faTrophy = faTrophy;
  protected readonly faTable = faTable;
}
