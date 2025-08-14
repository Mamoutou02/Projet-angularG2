import { Component, OnInit } from '@angular/core';
import {NgClass} from '@angular/common';

/*interface Contribution {
  projet: string;
  date: string;
  fonctionnalite: string;
  description: string;
  statut: string;
  active?: boolean; // Optionnel pour mettre une carte en surbrillance
}*/

@Component({
  selector: 'app-ensemble-contributions-contributeurs',
  templateUrl: './ensemble-contributions-contributeurs.html',
  styleUrls: ['./ensemble-contributions-contributeurs.css'],
  imports: [
    NgClass
  ],
  standalone: true
})
export class EnsembleContributionsContributeurs /*implements OnInit*/ {

  /*contributions: Contribution[] = [];

  ngOnInit() {
    // MOCK pour développement
    //  Plus tard : appel API ici
    this.contributions = [
      {
        projet: "CollabDev",
        date: "15 Jul 2023",
        fonctionnalite: "Fonctionnalités",
        description: "Intégration de l'authentification OAuth avec GitHub pour synchroniser les issues et pull requests.",
        statut: "Réglée",
        active: true
      },
      {
        projet: "CollabDev",
        date: "15 Jul 2021",
        fonctionnalite: "Fonctionnalités",
        description: "Intégration de l'authentification OAuth avec GitHub pour synchroniser les issues et pull requests.",
        statut: "Réglée"
      },
      {
        projet: "CollabDev",
        date: "15 Jul 2019",
        fonctionnalite: "Fonctionnalités",
        description: "Intégration de l'authentification OAuth avec GitHub pour synchroniser les issues et pull requests.",
        statut: "Réglée"
      },
      {
        projet: "CollabDev",
        date: "15 Jul 2022",
        fonctionnalite: "Fonctionnalités",
        description: "Intégration de l'authentification OAuth avec GitHub pour synchroniser les issues et pull requests.",
        statut: "Réglée"
      }
    ];
  }*/

}
