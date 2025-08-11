import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {faCoins, faMedal, faUserGroup} from '@fortawesome/free-solid-svg-icons';
import {IdeeDeProjet} from '../idee-de-projet/idee-de-projet';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-section',
  imports: [FaIconComponent, IdeeDeProjet, CommonModule],
  templateUrl: './dashboard-section.html',
  styleUrl: './dashboard-section.css'
})
export class DashboardSection {

  protected readonly faCoins = faCoins;
  protected readonly faMedal = faMedal;
  protected readonly faUserGroup = faUserGroup;

  contributeurs: any[] = [];
  coins: any[] = [];
  badges: any[] = []; 
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllContributeurs();
    this.getAllCoins();
    this.getAllBadges();
  }

  getAllContributeurs() {
  this.http.get<any[]>('http://localhost:8080/api/contributeurs')
    .subscribe({
      next: (res) => {
        this.contributeurs = res;

        console.log('Contributeurs reçus :', res);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets', err);
      }
    });
  }


  getAllCoins(){
  this.http.get<any[]>('http://localhost:8080/api/coins')
    .subscribe({
      next: (res) => {
        this.coins = res;
        console.log("Coins reçus", res);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des coins', err);
      }
    });
}

  getAllBadges(){
  this.http.get<any[]>('http://localhost:8080/api/badges')
    .subscribe({
      next: (res) => {
        this.badges = res;
        console.log("Badges reçus", res);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des badges', err);
      }
    });
}
}
