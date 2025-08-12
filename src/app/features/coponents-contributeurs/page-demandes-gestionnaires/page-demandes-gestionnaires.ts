import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
interface Demande {
  name: string;
  type: string;
}

@Component({
  selector: 'app-page-demandes-gestionnaires',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './page-demandes-gestionnaires.html',
  standalone: true,
  styleUrl: './page-demandes-gestionnaires.css'
})
export class PageDemandesGestionnaires {
  demandes: Demande[] = [
    { name: 'Djénèba Haidara', type: 'Demande à contribuer' },
    { name: 'Aissata Koné', type: 'Demande à contribuer' },
    { name: 'Oumar Dolo', type: 'Demande à contribuer' },
    { name: 'Daba Diallo', type: 'Demande à contribuer' },
    { name: 'Mamoutou Sangaré', type: 'Demande à contribuer' }
  ];

  valider(demande: Demande) {
    console.log('Valider :', demande);
    // plus tard : requête API pour valider la demande
  }

  refuser(demande: Demande) {
    console.log('Refuser :', demande);
    // plus tard : requête API pour refuser la demande
  }

  protected readonly faEye = faEye;
}
