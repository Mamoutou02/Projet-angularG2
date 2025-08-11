import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faUser, faCrown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

interface Project {
  name: string;
  status: 'En cours' | 'Débuté' | 'Terminé';
  role?: string;
  description?: string;
}

@Component({
  selector: 'app-mes-projet-contributeurs',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
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
  const contributeurId = 2; // L'id du contributeur dont tu veux afficher les projets

  this.http.get<any[]>('http://localhost:8080/api/projets').subscribe({
    next: (res) => {
      // Filtrer les projets liés au contributeurId
      this.projets = res.filter(projet => {
        // Si la liste des contributeurs est dans projet.contributeurs (tableau)
        if (projet.contributeurs && Array.isArray(projet.contributeurs)) {
          return projet.contributeurs.some((c: any) => c.id === contributeurId);
        }

        // Sinon, si le contributeur est le gestionnaire (par exemple)
        if (projet.gestionnaire && projet.gestionnaire.id === contributeurId) {
          return true;
        }

        return false; // sinon on exclut
      });
      this.getAllProjets();

      console.log('Projets filtrés:', this.projets);
      console.log('Tous les projets reçus:', res);
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

