import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-page-accueil',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './page-accueil.html',
  styleUrl: './page-accueil.css'
})
export class PageAccueil {

}
