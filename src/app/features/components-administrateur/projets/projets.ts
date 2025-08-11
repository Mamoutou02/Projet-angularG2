import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [RouterOutlet, DatePipe, CommonModule, HttpClientModule],
  templateUrl: './projets.html',
  styleUrls: ['./projets.css'] 
})
export class Projets implements OnInit {

  projets: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const contributeurId = 2;  
    const apiUrl = `http://localhost:8080/api/projets/recupere/${contributeurId}`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (res) => {
        this.projets = res;
        console.log('Projets reçus :', this.projets);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets', err);
      }
    });

    this.getAllProjets();
  }


  deleteProject(idProjet: number, idAdmin: number) {
  if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
    this.http.delete(`http://localhost:8080/api/projets/supprime/${idAdmin}?id=${idProjet}`, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.projets = this.projets.filter(p => p.idProjet !== idProjet);
          alert('Projet supprimé avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          alert('Erreur lors de la suppression du projet');
        }
      });
  }
}


getAllProjets() {
  this.http.get<any[]>('http://localhost:8080/api/projets')
    .subscribe({
      next: (res) => {
        this.projets = res;
        console.log('Projets reçus :', res);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets', err);
      }
    });
}


}
