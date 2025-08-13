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


  constructor(private http: HttpClient) {}

  


  

  onSubmit() : void {

   const idStr = localStorage.getItem('id');
  const id_contributeurs = Number(idStr);
  const id_idee_projet = 5; 
    const apiUrl = `http://localhost:8080/api/demandes/idContributeur/${id_contributeurs}/idIdeeProjet/${id_idee_projet}`;
    this.http.post(apiUrl, this.demandeForm).subscribe({
      next: (data) => {
        console.log("Demande envoyée avec succès :", data);
        alert("Demande envoyée avec succès !");
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi de la demande :', error);
      }
    });
  }
}
