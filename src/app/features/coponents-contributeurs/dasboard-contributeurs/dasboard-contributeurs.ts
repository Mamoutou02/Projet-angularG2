import { Component } from '@angular/core';
import {NavbarContributeurs} from '../navbar-contributeurs/navbar-contributeurs';
import {SidebarContributeurs} from '../sidebar-contributeurs/sidebar-contributeurs';

@Component({
  selector: 'app-dasboard-contributeurs',
  imports: [
    NavbarContributeurs,
    SidebarContributeurs
  ],
  templateUrl: './dasboard-contributeurs.html',
  styleUrl: './dasboard-contributeurs.css'
})
export class DasboardContributeurs {

}
