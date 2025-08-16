import {Component, EventEmitter, Output} from '@angular/core';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {PageFonctionnaliteGestionnaire} from '../page-fonctionnalite-gestionnaire/page-fonctionnalite-gestionnaire';
import {CommonModule} from '@angular/common';
import {PageDemandesGestionnaires} from '../page-demandes-gestionnaires/page-demandes-gestionnaires';
import {PageContributionsGestionnaires} from '../page-contributions-gestionnaires/page-contributions-gestionnaires';
import {PageCoinsGestionnaires} from '../page-coins-gestionnaires/page-coins-gestionnaires';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dashboard-gestionnaire',
  imports: [
    FaIconComponent, PageFonctionnaliteGestionnaire, CommonModule, PageDemandesGestionnaires, PageContributionsGestionnaires, PageCoinsGestionnaires,
    RouterLink
],
  templateUrl: './dashboard-gestionnaire.html',
  standalone: true,
  styleUrls: ['./dashboard-gestionnaire.css']
})
export class DashboardGestionnaire {
  contributions = [
    { userName: 'Djénèba Haidara', type: 'Authentification' },
    { userName: 'Aissata Koné', type: 'Inscription' },
    { userName: 'Oumar Dolo', type: 'Connexion' },
    { userName: 'Daba Diallo', type: 'Création groupe' },
    { userName: 'Mamoutou Sangaré', type: 'Suppression de membre' },
  ];

  // Variable pour savoir quel onglet est actif
  ongletActif: 'contributions' | 'fonctionnalites' | 'demandes' | 'coins' = 'contributions';

  // Méthode pour changer l'onglet actif
  changerOnglet(onglet: typeof this.ongletActif) {
    this.ongletActif = onglet;
  }
  @Output() fermer = new EventEmitter<void>();

  fermerDashboard() {
    this.fermer.emit(); // Informe le parent qu'on ferme
  }

  protected readonly faEye = faEye;
}
