import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormAjoutFonctionnalites} from '../form-ajout-fonctionnalites/form-ajout-fonctionnalites';
interface Fonctionnalite {
  id: number;
  description: string;
  statut: string;
  point?: number;
}

@Component({
  selector: 'app-page-fonctionnalite-gestionnaire',
  imports: [CommonModule, FormAjoutFonctionnalites],
  templateUrl: './page-fonctionnalite-gestionnaire.html',
  standalone: true,
  styleUrls: ['./page-fonctionnalite-gestionnaire.css']
})
export class PageFonctionnaliteGestionnaire implements OnInit{
  fonctionnalites: Fonctionnalite[] = [];

  ngOnInit() {
    // Pour l'instant, on initialise avec des données statiques, plus tard on fera appel à l'API
    this.fonctionnalites = [
      { id: 1, description: 'Authentification : Inscription, connexion, réinitialisation de mot de passe', statut: 'En cours', point: 100 },
      { id: 2, description: 'Mode sombre / clair : Thèmes personnalisables.', statut: 'En cours', point: 100 },
      { id: 3, description: 'Notifications : Alertes en temps réel, push notifications, email, SMS.', statut: 'Terminé', point: 300 },
      { id: 4, description: 'Commentaires / likes / partages : Interaction entre utilisateurs.', statut: 'Pas commencé', point: 300 },
      { id: 5, description: 'Navigation fluide : Menus, barres de recherche, onglets.', statut: 'Terminé', point: 200 },
      { id: 6, description: 'Tableau de bord (Dashboard) : Vue d\'ensemble pour l\'utilisateur.', statut: 'Terminé', point: 200 },
      { id: 7, description: 'Messagerie : Chat privé ou de groupe.', statut: 'En cours', point: 300 },
      { id: 8, description: 'Gestion des rôles et permissions : selon l\'utilisateur (admin, client, etc.)', statut: 'Pas commencé', point: 400 },
      { id: 9, description: 'Paiement en ligne : Par carte, mobile money.', statut: 'Pas commencé' }
    ];
  }
  afficherFormulaireAjout = false; // contrôle l’affichage du modal

  ouvrirFormulaire() {
    this.afficherFormulaireAjout = true;
  }

  fermerFormulaire() {
    this.afficherFormulaireAjout = false;
  }


}
