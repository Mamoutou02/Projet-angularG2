import { Component } from '@angular/core';
import { Header } from '../header/header';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-dashboard-contributeur',
  imports: [Header, RouterOutlet, Sidebar],
  templateUrl: './dashboard-contributeur.html',
  styleUrl: './dashboard-contributeur.css'
})
export class DashboardContributeur {


}
