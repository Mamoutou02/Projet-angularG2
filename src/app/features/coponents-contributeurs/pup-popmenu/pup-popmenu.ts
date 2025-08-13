import {Component, EventEmitter, Output} from '@angular/core';
import {FaireDemandeGestionnaire} from '../faire-demande-gestionnaire/faire-demande-gestionnaire';
import {NgIf} from '@angular/common';
import {AjouterCommentaires} from '../ajouter-commentaires/ajouter-commentaires';

@Component({
  selector: 'app-pup-popmenu',
  imports: [
    FaireDemandeGestionnaire,
    NgIf,
    AjouterCommentaires
  ],
  templateUrl: './pup-popmenu.html',
  standalone: true,
  styleUrls: ['./pup-popmenu.css']
})
export class PupPopmenu {
  isVisible = true;

  @Output() voirCommentaires = new EventEmitter<void>();
  @Output() faireDemande = new EventEmitter<void>();
  @Output() ajouterCommentaire = new EventEmitter<void>();
  @Output() fermer = new EventEmitter<void>();

  close() {
    this.isVisible = false;
    this.fermer.emit();
  }

  onVoirCommentaires() {
    this.voirCommentaires.emit();
  }
  popupFaireDemandeVisible: boolean = false;
  onFaireDemande() {
    this.faireDemande.emit();
  }

  onAjouterCommentaire() {
    this.ajouterCommentaire.emit();
  }

  fermerFaireDemande() {
    this.popupFaireDemandeVisible = false;
  }


}
