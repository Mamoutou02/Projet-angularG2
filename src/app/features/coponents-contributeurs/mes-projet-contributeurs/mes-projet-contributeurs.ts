import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faUser, faCrown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import {DashboardGestionnaire} from '../dashboard-gestionnaire/dashboard-gestionnaire';

interface Project {
  name: string;
  status: 'En cours' | 'Débuté' | 'Terminé';
  role?: string;
  description?: string;
}

@Component({
  selector: 'app-mes-projet-contributeurs',
  standalone: true,
  imports: [CommonModule, FaIconComponent, DashboardGestionnaire],
  templateUrl: './mes-projet-contributeurs.html',
  styleUrls: ['./mes-projet-contributeurs.css']
})
export class MesProjetContributeurs {
  // Icônes
  faEye = faEye;


  // Données des projets
  managerProjects: Project[] = [
    {
      name: 'Projet Alpha',
      status: 'En cours',
      role: 'Gestionnaire',
      description: 'Développement d\'une nouvelle application web'
    } ,
    {
      name: 'Projet Star',
      status: 'Terminé',
      role: 'Gestionnaire',
      description: 'Développement d\'une nouvelle application web'
    },
    {
      name: 'Projet Star',
      status: 'Débuté',
      role: 'Gestionnaire',
      description: 'Développement d\'une nouvelle application web'
    }
  ];

  contributorProjects: Project[] = [
    {
      name: 'Projet Beta',
      status: 'En cours',
      role: 'Contributeur',
      description: 'Amélioration de l\'interface utilisateur'
    },
    {
      name: 'Projet ODK',
      status: 'Débuté',
      role: 'Contributeur',
      description: 'Amélioration de l\'interface utilisateur'
    },
    {
      name: 'Projet ODK',
      status: 'Terminé',
      role: 'Contributeur',
      description: 'Amélioration de l\'interface utilisateur'
    }
  ];

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const id_contributeur = 2;
    const apiUrl = `http://localhost:8080/api/projets/recupere/${id_contributeur}`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (res) => {
        this.projets = res;
        console.log('Projets reçus :', this.projets);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets', err);
      }
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

  ouvrirDashboard(projet: any) {
    this.projetSelectionne = projet;
    this.dashboardOuvert = true;
  }

  fermerDashboard() {
    this.dashboardOuvert = false;
  }
}
