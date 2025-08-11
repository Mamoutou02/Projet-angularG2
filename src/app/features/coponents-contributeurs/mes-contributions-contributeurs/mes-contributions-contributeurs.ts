import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {Location} from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


export interface Contribution {
  icon: string;
  title: string;
  date: string;
  description: string;
  status: string;
  statusText: string;
  auteur: string;
}

@Component({
selector: 'app-mes-contributions-contributeurs',
standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './mes-contributions-contributeurs.html',
  styleUrl: './mes-contributions-contributeurs.css'
})
export class MesContributionsContributeurs {
  constructor(private router: Router, private location: Location) {} // Injectez Location abd Router
  activeTab: string = 'contribution';


contributions: Contribution[] = [
  {
    icon: 'fa-bell',
    title: 'API NOTIFICATION',
    date: '15 Juil 2023',
    description: 'Intégration de l\'authentification OAUTH avec GitHub pour Synchroniser les issues et pull requests.',
    status: 'rejected',
    statusText: 'Rejetée',
    auteur: 'Oumar DOLO'
  },
  {
    icon: 'fa-lock',
    title: 'AUTHENTIFICATION',
    date: '15 Juil 2023',
    description: 'Mise en place d\'un système d\'authentification sécurisé avec chiffrement AES-256.',
    status: 'approved',
    statusText: 'Approuvée',
    auteur: 'Djeneba Haïdara'
  },
  {
    icon: 'fa-user-shield',
    title: 'AUTORISATION RBAC',
    date: '20 Août 2023',
    description: 'Implémentation du contrôle d\'accès basé sur les rôles (Admin, Éditeur, Lecteur).',
    status: 'pending',
    statusText: 'En revue',
    auteur: 'Hamidou Dijré'
  },
  {
    icon: 'fa-key',
    title: 'JWT TOKENS',
    date: '10 Sep 2023',
    description: 'Génération et validation de tokens JWT pour les API internes.',
    status: 'approved',
    statusText: 'Approuvée',
    auteur: 'Élodie MARTIN'
  }
];

features = [
  { id: 1, description: 'Mode sombre / clair : Thèmes personnalisables.' },
  { id: 2, description: 'Notifications : Alertes en temps réel, push notifications, email, SMS.' },
  { id: 3, description: 'Commentaires / likes / partages : Interaction entre utilisateurs.' },
  { id: 4, description: 'Navigation fluide : Menus, barres de recherche, onglets.' },
  { id: 5, description: 'Tableau de bord (Dashboard) : Vue d\'ensemble pour l\'utilisateur.' },
  { id: 6, description: 'Messagerie : Chat privé ou de groupe.' }
];

   switchTab(tab: string): void {
    this.activeTab = tab;
  }

addNew(): void {
  //logique d'ajout
    this.router.navigate(['/new-contribution']);
    console.log('Ajouter une nouvelle contribution');
  }


openContributionDetails(contribution: Contribution): void {
  this.router.navigate(['/contribution-details'], {
    state: {
      contributionData: contribution
      // {
      //   title: contribution.title,
      //   date: contribution.date,
      //   description: contribution.description,
      //   status: contribution.status,
      //   statusText: contribution.statusText,
      //   auteur: contribution.auteur,
      //   icon: contribution.icon
      // }
    }
  });
}
}
