import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-popup-eye',
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './popup-eye.html',
  styleUrl: './popup-eye.css'
})
export class PopupEye {

  @Input() titreProjet: string = '';
  @Input() niveau: string = '';
  @Input() description: string = '';

  @Output() closeModal = new EventEmitter<void>();

  fermerPopup() {
    this.closeModal.emit();
  }

  demandeForm = {
  datedemande: new Date(),
  statut_demande_participation: 'EN_ATTENTE',
  description: '',
  type_demande_participation: ''
};

@Input() ideeProjetId!: number;

@Input() projetId!: number;

  constructor(private http: HttpClient) {}

  


  

  onSubmit(): void {
  const idStr = localStorage.getItem('id');
  const id_contributeur = Number(idStr);

  let apiUrl = '';

  if (this.projetId) {
    // si c'est un projet déjà créé
    apiUrl = `http://localhost:8080/api/demandes/participation/idProjet/${this.projetId}/idContributeur/${id_contributeur}?description=${encodeURIComponent(this.demandeForm.description)}`;
  } else if (this.ideeProjetId) {
    // si c'est une idée de projet
    apiUrl = `http://localhost:8080/api/demandes/idContributeur/${id_contributeur}/idIdeeProjet/${this.ideeProjetId}`;
  } else {
    alert('Impossible d’envoyer la demande : aucun projet ou idée sélectionné.');
    return;
  }

  this.http.post(apiUrl, this.demandeForm).subscribe({
    next: (data) => {
      console.log("Demande envoyée avec succès :", data);
      alert("Demande envoyée avec succès !");
    },
    error: (error) => {
      console.error('Erreur lors de l\'envoi de la demande :', error);
      alert('Erreur lors de l\'envoi de la demande. Veuillez réessayer. ' + error);
    }
  });
}


}
