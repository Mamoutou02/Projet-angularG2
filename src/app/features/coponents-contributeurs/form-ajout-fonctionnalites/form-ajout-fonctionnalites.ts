import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-form-ajout-fonctionnalites',
  imports: [],
  templateUrl: './form-ajout-fonctionnalites.html',
  standalone: true,
  styleUrl: './form-ajout-fonctionnalites.css'
})
export class FormAjoutFonctionnalites {
  @Output() close = new EventEmitter<void>();

  annuler() {
    this.close.emit();
  }

  enregistrer() {
    // ici tu peux gérer l'enregistrement des données
    this.close.emit(); // puis fermer la modale
  }

}
