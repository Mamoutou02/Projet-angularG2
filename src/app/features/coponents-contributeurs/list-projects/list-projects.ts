import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faEllipsisV, faEye, faLockOpen, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { PopupEye } from "./popup-eye/popup-eye";
import { PopupActions } from './popup-actions/popup-actions';
import { PopupComments } from './popup-comments/popup-comments';
import { PopupAddComment } from './popup-add-comment/popup-add-comment';
import { RouterModule } from '@angular/router';
import { PopupUnlock } from './popup-unlock/popup-unlock';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-list-projects',
  imports: [CommonModule, RouterModule, FontAwesomeModule, PopupUnlock, PopupComments, PopupAddComment, PopupEye, PopupActions],
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
  projects: any[] = [];
  involvedProjectIds: Set<number> = new Set();
  currentUserId: number = 0;

  selectedProject: any = null;
  showModal: boolean = false;
  showActionMenu: boolean = false;
  projectForActions: any = null;
  showCommentsModal: boolean = false;
  commentsForProject: any[] = [];
  showAddCommentModal: boolean = false;
  showUnlockPopup = false;
  userCoins = 2000;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.currentUserId = Number(localStorage.getItem('id'));
    this.loadAllData();
    
  }

  loadAllData() {
    forkJoin([
      this.http.get<any[]>('http://localhost:8080/api/projets/allprojets'),
      this.http.get<any[]>(`http://localhost:8080/api/projets/gestionnaire/${this.currentUserId}`),
      this.http.get<any[]>(`http://localhost:8080/api/demandes/projets-acceptes/${this.currentUserId}`)
    ]).subscribe({
      next: ([allProjects, gestionnaireProjets, contributeurProjets]) => {
        this.projects = allProjects;
        gestionnaireProjets.forEach(p => this.involvedProjectIds.add(p.idProjet));
        contributeurProjets.forEach(p => this.involvedProjectIds.add(p.idProjet));
      },
      error: (err) => console.error('Erreur lors du chargement des données', err)
    });
  }

  isUserInvolved(projet: any): boolean {
    return this.involvedProjectIds.has(projet.idProjet);
  }

  isProjectBlocked(projet: any): boolean {
    return this.isUserInvolved(projet) || projet.statut === 'PAS_DEBUTER';
  }

  getBlockedReason(projet: any): string {
    if (this.isUserInvolved(projet)) return 'Déjà impliqué';
    if (projet.statut === 'PAS_DEBUTER') return 'Pas encore commencé';
    return '';
  }

  

  openPopupDetail(projet: any) {
    if (this.isProjectBlocked(projet)) return;
    this.selectedProject = projet;
    this.showModal = true;
  }

  onUnlockClick(projet: any) {
    if (this.isProjectBlocked(projet)) return;
    this.selectedProject = projet;
    this.showUnlockPopup = true;
  }

  onMenuClick(projet: any) {
    if (this.projectForActions === projet) {
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

  closePopup() {
    this.showModal = false;
    this.selectedProject = null;
  }

  onViewComments(projet: any) {
    this.commentsForProject = [
      {
        nom: 'Oumar Dolo',
        date: new Date('2025-07-31T18:45:00'),
        message: 'Cette idée est vraiment innovant système qui permet de faire recommandation',
      },
      // ... autres commentaires
    ];
    this.showCommentsModal = true;
    this.onCloseActions();
  }

  closeCommentsPopup() {
    this.showCommentsModal = false;
    this.commentsForProject = [];
  }

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
    if (!this.commentsForProject) this.commentsForProject = [];
    this.commentsForProject.push({
      nom: 'Utilisateur anonyme',
      date: new Date(),
      message: commentaire,
    });
    this.closeAddCommentPopup();
  }

  closeUnlockPopup() {
    this.showUnlockPopup = false;
    this.selectedProject = null;
  }

  onProjectUnlocked() {
    if (this.selectedProject) {
      this.selectedProject.debloque = true;
      this.userCoins -= this.selectedProject.coin;
    }
  }

  

  DebloquerProjet(projet: any) {
  if (!projet || !projet.idProjet) {
    console.error("Projet invalide :", projet);
    return;
  }

  this.selectedProject = projet; // on définit le projet courant

  this.http.post(
    `http://localhost:8080/api/debloqueProjet/contributeur/${this.currentUserId}/projet/${projet.idProjet}`,
    {}
  ).subscribe({
    next: (res) => {
      console.log('Projet débloqué', res);
      alert('Projet débloqué avec succès');
    },
    error: (err) => {
      console.error('Erreur', err);
      console.log("projetId", projet.idProjet, "userId", this.currentUserId);
      alert('Une erreur est survenue');
    }
  });
}

}