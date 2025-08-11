import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDatabase, faProjectDiagram, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';

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
    this.getAllProjets();
    this.getAllbadge();
  }

  

 

getAllProjets() {
  this.http.get<any[]>('http://localhost:8080/api/projets')
    .subscribe({
      next: (res) => {
        this.projetsActifs = res.filter(projet => projet.statut === 'EN_COURS');
        this.projets = res;

        console.log('Projets reçus :', res);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets', err);
      }
    });
}





  getAllbadge(){
    this.http.get<any[]>('http://localhost:8080/api/badges')
    .subscribe({
      next: (res) => {
        this.badges = res;
        console.log("Badges recus", res)
      },
      error: (err) => {
        console.error('Erreur lors du chargement des badges', err);
      }
    });
  }
 
  


       

}
