import { Component } from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    FaIconComponent,RouterOutlet
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  protected readonly faUserCircle = faUserCircle;
}
