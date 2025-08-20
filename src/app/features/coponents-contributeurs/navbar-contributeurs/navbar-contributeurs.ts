import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar-contributeurs',
    imports: [
        FaIconComponent
    ],
  templateUrl: './navbar-contributeurs.html',
  styleUrl: './navbar-contributeurs.css'
})
export class NavbarContributeurs {

  protected readonly faUserCircle = faUserCircle;
}
