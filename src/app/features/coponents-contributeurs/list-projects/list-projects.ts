import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faEllipsisV, faEye, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { PopupEye } from "./popup-eye/popup-eye";
import { Projet } from '../../../models/projet';
import { PopupActions } from './popup-actions/popup-actions';
import { PopupComments } from './popup-comments/popup-comments';
import { PopupAddComment } from './popup-add-comment/popup-add-comment';
import { RouterLink, RouterModule } from '@angular/router';
import { PopupUnlock } from './popup-unlock/popup-unlock';
import { faUnlock } from '@fortawesome/free-solid-svg-icons/faUnlock';

@Component({
  selector: 'app-list-projects',
  imports: [CommonModule, RouterModule, FontAwesomeModule, PopupUnlock, PopupComments,PopupAddComment, PopupEye, PopupActions],
  templateUrl: './list-projects.html',
  styleUrl: './list-projects.css'
})
export class ListProjects {
  
  protected readonly faEye = faEye;
  protected readonly faLockOpen = faLockOpen;
  protected readonly faUnlock = faUnlock;
  protected readonly faEllipsisV = faEllipsisV;
  protected readonly faArrowLeft = faArrowLeft;
  chemin: string = '/dashboardContributeur';
  projets: Projet[] = [
    { id: 1, titre: 'Système de recommandation', statut: 'En cours', coin: 100, debloque: false, niveau: 'Débutant', description: 'Système intelligent qui propose des recommandations personnalisées aux utilisateurs selon leurs préférences et comportements.' },
    { id: 2, titre: 'Système de distribution', statut: 'En cours', coin: 500, debloque: false },
    { id: 3, titre: 'Application de chat temps réel', statut: 'Terminé', coin: 1000, debloque: false },
    { id: 4, titre: 'Site e-commerce avec gestion de stock, panier, et suivi .......', statut: 'Débuté', coin: 750, debloque: false },
    { id: 5, titre: 'Système de suivi des ventes et statistiques (tableaux de bord).', statut: 'Terminé', coin: 1500, debloque: false },
    { id: 6, titre: 'Application de domotique pour gérer lumières, température...', statut: 'Terminé', coin: 13000, debloque: false },
    { id: 7, titre: 'Capteurs connectés pour la surveillance agricole', statut: 'Ecours', coin: 8500, debloque: false },
    { id: 8, titre: 'Plateforme d’e-learning avec quiz interactifs et suivi des progrès.', statut: 'Débuté', coin: 15000, debloque: false },
    { id: 9, titre: 'Application de quiz multijoueur en temps réel.', statut: 'Débuté', coin: 6000, debloque: false },
  ];

  selectedProject: any = null;
  showModal: boolean = false;

  showActionMenu: boolean = false;
  projectForActions: any = null;

  openPopupDetail(projet: any) {
    this.selectedProject = {
      titre: projet.titre,
      niveau: projet.niveau ?? 'Débutant',
      description: projet.description ?? 'Pas de description disponible.'
    };
    this.showModal = true;
  }

  closePopup() {
    this.showModal = false;
    this.selectedProject = null;
  }

  onMenuClick(projet: any) {
  if (this.projectForActions === projet) {
    // Fermer si déjà ouvert
    this.projectForActions = null;
    this.showActionMenu = false;
  } else {
    this.projectForActions = projet;
    this.showActionMenu = true;
  }
}

  onCloseActions() {
    this.showActionMenu = false;
    this.projectForActions = null;
  }




  showCommentsModal: boolean = false;
  commentsForProject: any[] = [];

  onViewComments(projet: any) {
    this.commentsForProject = [
      {
        nom: 'Oumar Dolo',
        date: new Date('2025-07-31T18:45:00'),
        message: 'Cette idée est vraiment innovant système qui permet de faire recommandation',
      },
      {
        nom: 'Oumar Konaré',
        date: new Date('2025-07-31T19:00:00'),
        message: 'Cette idée n’est aussi innovante de nos jours cela n’as pas trop d’impact actuellement',
      },
      {
        nom: 'Sidi Diallo',
        date: new Date('2025-07-31T20:25:00'),
        message: 'Je supporte cette idée car sa parait très important et c’est une solution d’actualité',
      },
    ];
    this.showCommentsModal = true;
    this.onCloseActions();
  }

  closeCommentsPopup() {
    this.showCommentsModal = false;
    this.commentsForProject = [];
  }

  showAddCommentModal: boolean = false;

  onAddComment(projet: any) {
    this.selectedProject = projet;
    this.showAddCommentModal = true;
    this.onCloseActions();
  }

  closeAddCommentPopup() {
    this.showAddCommentModal = false;
    this.selectedProject = null;
  }

  handleSendComment(commentaire: string) {
    if (!this.commentsForProject) {
      this.commentsForProject = [];
    }

    this.commentsForProject.push({
      nom: 'Utilisateur anonyme',
      date: new Date(),
      message: commentaire,
    });

    this.closeAddCommentPopup();
  }


  showUnlockPopup = false;
  userCoins = 2000; // Points actuels du joueur
  
  onUnlockClick(projet: any) {
    this.selectedProject = projet;
    this.showUnlockPopup = true;
  }

  closeUnlockPopup() {
    this.showUnlockPopup = false;
    this.selectedProject = null;
  }

  onProjectUnlocked() {
    if (this.selectedProject) {
      this.selectedProject.debloque = true;
      // Optionnel : mise à jour des points
      this.userCoins -= this.selectedProject.coin;
    }
  }



}