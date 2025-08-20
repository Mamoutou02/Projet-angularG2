import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faUser, faCrown, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import {DashboardGestionnaire} from '../dashboard-gestionnaire/dashboard-gestionnaire';
import { ProjetSelectionService } from '../../../services/projet-selection-service-';
import { Router, RouterLink } from '@angular/router';

interface Project {
  name: string;
  status: 'En cours' | 'Débuté' | 'Terminé';
  role?: string;
  description?: string;
}

@Component({
  selector: 'app-mes-projet-contributeurs',
  standalone: true,
  imports: [CommonModule, FaIconComponent, DashboardGestionnaire, RouterLink],
  templateUrl: './mes-projet-contributeurs.html',
  styleUrls: ['./mes-projet-contributeurs.css']
})
export class MesProjetContributeurs {
  // Icônes
  faEye = faEye;


  
   

  

  selectedProject: Project | null = null;
  showPopup = false;

  openPopup(project: Project): void {
    this.selectedProject = project;
    this.showPopup = true;
    setTimeout(() => {
      // Force la détection de changement après l'update
    }, 0);
  }

  closePopup(): void {
    this.showPopup = false;
    setTimeout(() => {
      this.selectedProject = null;
    }, 300); // Attend la fin de l'animation
  }



  protected readonly faCrown = faCrown;
  protected readonly faUser = faUser;
  protected readonly faTimes = faTimes;


  projets: any[] = [];
   contributions: any[] = [];

  constructor(private http: HttpClient, private projetSelectionService: ProjetSelectionService, private router: Router) {}

  ngOnInit(): void {
    const idStr = localStorage.getItem('id');
    const id_contributeurs = Number(idStr);
 
    const apiUrl = `http://localhost:8080/api/projets/gestionnaire/${id_contributeurs}`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (res) => {
        this.projets = res;
        console.log('Projets reçus :', this.projets);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets', err);
      }
    });

      console.log('URL appelée:', apiUrl);


   
  }

  ouvrirDashboard(projet: any) {
  this.projetSelectionne = projet;
  this.dashboardOuvert = true;

  // Partage l'ID du projet
  this.projetSelectionService.selectProjet(projet.idProjet);

  this.router.navigate(['/dashboardGestionnaire']);

}



  getContributionsByProjet(idProjet: number) {
  const apiUrl = `http://localhost:8080/api/contributions/projet/${idProjet}`;
  this.http.get<any[]>(apiUrl).subscribe({
    next: (res) => {
      this.contributions = res;
      console.log('Contributions du projet :', this.contributions);
    },
    error: (err) => console.error(err)
  });
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
  projetSelectionne: any = null;

  // cas du formulaire d'affichage du detail du projet
  dashboardOuvert = false;

  

  fermerDashboard() {
    this.dashboardOuvert = false;
  }
}
