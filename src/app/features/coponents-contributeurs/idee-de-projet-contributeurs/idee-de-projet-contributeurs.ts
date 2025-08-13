import { Component } from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import {faEllipsisV, faEye} from '@fortawesome/free-solid-svg-icons';
import { DetailIdeeProjet } from '../detail-idee-projet/detail-idee-projet';
import {PupPopmenu} from '../pup-popmenu/pup-popmenu';
import {FaireDemandeGestionnaire} from '../faire-demande-gestionnaire/faire-demande-gestionnaire';
import {FormAjoutIdee} from '../form-ajout-idee/form-ajout-idee';
import { HttpClient } from '@angular/common/http';
import {AjouterCommentaires} from '../ajouter-commentaires/ajouter-commentaires';



@Component({
  selector: 'app-idee-de-projet-contributeurs',
  standalone: true,
  templateUrl: './idee-de-projet-contributeurs.html',
  imports: [CommonModule, FaIconComponent, DetailIdeeProjet, PupPopmenu, FaireDemandeGestionnaire, FormAjoutIdee, AjouterCommentaires],
  styleUrl: './idee-de-projet-contributeurs.css'
})
export class IdeeDeProjetContributeursComponent {

  faEye = faEye;
  faEllipsisV = faEllipsisV;

  ideeProjet : any[] = [];
  constructor(private http: HttpClient) {}


  ngOnInit(): void {

    const apiUrl = `http://localhost:8080/api/idee-projets`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (res) => {
        this.ideeProjet = res;
        console.log('Projets reçus :', this.ideeProjet);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets', err);
      }
    });
  }

  projetSelectionne: any = null;

  ouvrirDetail(projet: any) {
    this.projetSelectionne = projet;
  }
  fermerDetail() {
    this.projetSelectionne = null;
  }
  selectedProjet: any = null;
  closeMenu() {
    this.selectedProjet = null;
  }

  voirCommentaires(projet: any) {
    console.log("Voir les commentaires de :", projet);
    this.closeMenu();
  }

  faireDemande(projet: any) {
    console.log("Faire une demande pour :", projet);
    this.closeMenu();
  }

  // cas du formulaire ajouter d'un commentaire

  afficherFormulaireCommentaire = false;
  projetPourCommentaire: any = null;

  ajouterCommentaire(projet: any) {
    this.projetPourCommentaire = projet;
    this.afficherFormulaireCommentaire = true;
    this.closeMenu();
  }

  fermerFormulaireCommentaire() {
    this.afficherFormulaireCommentaire = false;
    this.projetPourCommentaire = null;
  }

  gererCommentaireSoumis(data: { nom: string; commentaire: string }) {
    console.log('Commentaire soumis pour projet', this.projetPourCommentaire, data);
    // Ici tu peux envoyer la data à ton backend, ou mettre à jour la liste, etc.
    this.fermerFormulaireCommentaire();
  }
  // cas du menu pop avec les différents options

  ouvrirMenu(projet: any) {
    this.selectedProjet = projet;
  }

  fermerMenu() {
    this.selectedProjet = null;
  }
  // cas du formulaire d'ajout de projet

  afficherFormulaire = false;

  ouvrirFormulaire() {    this.afficherFormulaire = true;

    this.afficherFormulaire = true;
  }

  fermerFormulaire() {
    this.afficherFormulaire = false;
  }

  ajouterProjetDepuisFormulaire(projet: any) {

    this.fermerFormulaire();
  }




}


