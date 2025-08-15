import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCodeBranch, faCog, faGear, faHome, faLayerGroup, faLightbulb, faList, faMedal, fas, faTrophy,faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
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
    protected readonly githubIcon = faCodeBranch; // Assuming you want to use the GitHub icon as well
    protected readonly faReward = faTrophy; // Assuming you want to use the Medal icon for rewards
    protected readonly faUserCircle = faUserCircle; // User icon for the header


  nom: string | null = null;
  prenom: string | null = null;

  ngOnInit() {
    this.nom = localStorage.getItem('nom') ?? '';
    this.prenom = localStorage.getItem('prenom') ?? '';
  }



}
