import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-ajout-idee',
  templateUrl: './form-ajout-idee.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./form-ajout-idee.css'] // si tu as du style séparé
})
export class FormAjoutIdee {
  @Output() annuler = new EventEmitter<void>();
  @Output() projetCree = new EventEmitter<any>();

  // modèle pour ton formulaire
  nouveauProjet = {
    titre: '',
    description: '',
    domaine: '',
    difficulte: '',
    leguer: false,
  };

  constructor(private http: HttpClient) {}

  // méthode appelée au clic sur "Soumettre l'idée"
 onSubmit() {
  
    const apiUrl = `http://localhost:8080/api/idee-projets/contributeur/${2}/domaine/${1}`;

    this.http.post(apiUrl, this.nouveauProjet).subscribe({
      next: (res) => {
        console.log('projet créé', res);
        alert('Projet créé avec succès');
      },
      error: (err) => {
        console.error('Erreur', err);
        alert('Une erreur est survenue');
      }
    });
  }

  // méthode appelée au clic sur "Annuler" ou sur la croix
  annulerFormulaire() {
    this.annuler.emit();
  }
}
