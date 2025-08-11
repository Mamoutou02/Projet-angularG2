import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-ajouter-commentaires',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './ajouter-commentaires.html',
  standalone: true,
  styleUrl: './ajouter-commentaires.css'
})
export class AjouterCommentaires {
  nom: string = '';
  commentaire: string = 'Actuellement cette idée auras une très grande impact.';

  @Output() fermerPopup = new EventEmitter<void>();
  @Output() soumis = new EventEmitter<{ nom: string; commentaire: string }>();

  envoyer() {
    console.log('Demande envoyée :', this.nom, this.commentaire);
    this.soumis.emit({ nom: this.nom, commentaire: this.commentaire });
    this.fermer(); // Ferme le popup après l’envoi
  }

  fermer() {
    this.fermerPopup.emit(); // Permet de fermer le popup dans le composant parent
  }

}
