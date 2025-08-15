import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjetSelectionService } from '../../../services/projet-selection-service-';

@Component({
  selector: 'app-form-ajout-fonctionnalites',
  imports: [FormsModule],
  templateUrl: './form-ajout-fonctionnalites.html',
  standalone: true,
  styleUrls: ['./form-ajout-fonctionnalites.css']
})
export class FormAjoutFonctionnalites {
  @Output() close = new EventEmitter<void>();

  formData = {
    fonctionnaliteNom: '',
    fonctionnaliteDescription: '',
    statut: 'DISPONIBLE',
    pointFonctionnalite: 0,
    projetId: 0
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private projetSelectionService: ProjetSelectionService
  ) {}

  annuler() {
    this.close.emit();
  }

  enregistrer() {
    this.close.emit();
  }

  onSubmit() {
    const idStr = localStorage.getItem('id');
    const idGestionnaire = Number(idStr);

    // Récupérer l'ID du projet sélectionné
    const selectedProjetId = this.projetSelectionService.getSelectedProjet();
    if (!selectedProjetId) {
      alert("Aucun projet sélectionné !");
      return;
    }
    this.formData.projetId = selectedProjetId;

    const apiUrl = `http://localhost:8080/api/fonctionnalites/gestionnaire/${4}/newfonctionnalite`;

    this.http.post(apiUrl, this.formData).subscribe({
      next: (res) => {
        console.log('Ajout réussi', res);
        alert('Fonctionnalité ajoutée avec succès !');
        this.close.emit(); // ferme le modal après ajout
      },
      error: (err) => {
        console.error('Erreur', err);
        alert('Une erreur est survenue lors de l\'ajout de la fonctionnalité.');
      }
    });
  }
}
