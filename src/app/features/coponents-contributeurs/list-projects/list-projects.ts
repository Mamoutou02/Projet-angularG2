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
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-projects',
  imports: [CommonModule, RouterModule, FontAwesomeModule, PopupUnlock, PopupComments,PopupAddComment, PopupEye, PopupActions],
  templateUrl: './list-projects.html',
  styleUrls: ['./list-projects.css']
})
export class ListProjects {
  
  protected readonly faEye = faEye;
  protected readonly faLockOpen = faLockOpen;
  protected readonly faUnlock = faUnlock;
  protected readonly faEllipsisV = faEllipsisV;
  protected readonly faArrowLeft = faArrowLeft;
  chemin: string = '/dashboardContributeur';


   projet : any[] = [];

  selectedProject: any = null;
  showModal: boolean = false;

  showActionMenu: boolean = false;
  projectForActions: any = null;
  

  openPopupDetail(projet: any) {
  this.selectedProject = projet;
  this.showModal = true;
  console.log('Projet sélectionné pour popup :', projet);
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


    projects: any[] = [];
  
    constructor(private http: HttpClient) {}
  
   ngOnInit(): void {

   this.getAllProjets();
    
  
  }
  
  
  
  getAllProjets() {
    this.http.get<any[]>('http://localhost:8080/api/projets/allprojets')
      .subscribe({
        next: (res) => {
          this.projects = res;
          console.log('Projets reçus :', res);
          
        },
        error: (err) => {
          console.error('Erreur lors du chargement des projets', err);
        }
      });
  }



  
  
  
 





}