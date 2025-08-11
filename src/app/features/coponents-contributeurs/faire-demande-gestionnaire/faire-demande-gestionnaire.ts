import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faire-demande-gestionnaire',
  imports: [FormsModule],
  templateUrl: './faire-demande-gestionnaire.html',
  standalone: true,
  styleUrl: './faire-demande-gestionnaire.css'
})
export class FaireDemandeGestionnaire {
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
