import { Component } from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {NgForOf} from '@angular/common';
import {faEye} from '@fortawesome/free-solid-svg-icons';
interface Contribution {
  userName: string;
  description: string;
}

@Component({
  selector: 'app-page-contributions-gestionnaires',
  imports: [
    FaIconComponent,
    NgForOf
  ],
  templateUrl: './page-contributions-gestionnaires.html',
  standalone: true,
  styleUrl: './page-contributions-gestionnaires.css'
})
export class PageContributionsGestionnaires {
  contributions:Contribution[] = [
    { userName: 'Djénèba Haidara', description: 'Authentification' },
    { userName: 'Aissata Koné', description: 'Inscription' },
    { userName: 'Oumar Dolo', description: 'Connexion' },
    { userName: 'Daba Diallo', description: 'Création groupe' },
    { userName: 'Mamoutou Sangaré', description: 'Suppression de membre' },
  ];
  valider(contribution: Contribution) {
    console.log('Valider :', contribution);
    // plus tard : requête API pour valider la demande
  }

  refuser(contribution: Contribution) {
    console.log('Refuser :', contribution);
    // plus tard : requête API pour refuser la demande
  }

  protected readonly faEye = faEye;
}
