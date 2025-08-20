import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDatabase, faProjectDiagram, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '../../../../services/badges';

@Component({
  selector: 'app-stats-cards',
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.css'
})
export class StatsCards {
  protected readonly faProjectDiagram = faProjectDiagram;
  protected readonly faUsers = faUser;
  protected readonly faTrophy = faTrophy;
  protected readonly faDatabase = faDatabase;

  projets : any[] = [];
  projetsActifs : any[] = [];

  contributeurs : any[] = [];

  badges : any[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(): void{
    this.getProjetsByContributeur();

    this.getAllProjets();

    const idStr = localStorage.getItem('id');
      const id_contributeurs = Number(idStr);

    // Charger les badges
    const apiUrl = `http://localhost:8080/api/badges/contributeur/${id_contributeurs}`;
    this.http.get<Badge[]>(apiUrl).subscribe({
      next: (res) => {
        this.badges = res;
        console.log('Badges reçus :', this.badges);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des badges', err);
      }
    });
  }


getProjetsByContributeur() {
  const idStr = localStorage.getItem('id');
  const id_contributeurs = Number(idStr);

  const apiUrl = `http://localhost:8080/api/projets/gestionnaire/${id_contributeurs}`;
  this.http.get<any[]>(apiUrl).subscribe({
    next: (res) => {
      this.projetsActifs = res || [];
      console.log('Projets reçus :', this.projetsActifs);
    },
    error: (err) => {
      console.error('Erreur lors du chargement des projets', err);
    }
  });
}

getAllProjets() {
  const apiUrl = `http://localhost:8080/api/projets/allprojets`;
  this.http.get<any[]>(apiUrl).subscribe({
    next: (res) => {
      this.projets = res || [];
      console.log('Projets reçus :', this.projets);
    },
    error: (err) => {
      console.error('Erreur lors du chargement des projets', err);
    }
  });
}

getAllbadge() {
  this.http.get<any[]>('http://localhost:8080/api/badges').subscribe({
    next: (res) => {
      this.badges = res || [];
      console.log('Badges reçus', this.badges);
    },
    error: (err) => {
      console.error('Erreur lors du chargement des badges', err);
    }
  });
}



       

}
