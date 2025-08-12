import {Component, OnInit} from '@angular/core';
import {faDeleteLeft, faEye} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {CommonModule} from '@angular/common';
import {FormAjoutCoin} from '../form-ajout-coin/form-ajout-coin';
interface Coin {
  id: number;
  valeur: number;
}

@Component({
  selector: 'app-page-coins-gestionnaires',
  imports: [
    FaIconComponent, CommonModule, FormAjoutCoin
  ],
  templateUrl: './page-coins-gestionnaires.html',
  standalone: true,
  styleUrl: './page-coins-gestionnaires.css'
})
export class PageCoinsGestionnaires implements OnInit{

   protected readonly faDeleteLeft = faDeleteLeft;
  coins: Coin[] = [];

  ngOnInit() {
    // --- Données fictives pour développement ---
    this.coins = [
      { id: 1, valeur: 100 },
      { id: 2, valeur: 500 },
      { id: 3, valeur: 1000 },
      { id: 4, valeur: 700 },
      { id: 5, valeur: 900 },
      { id: 6, valeur: 400 },
      { id: 7, valeur: 800 },
      { id: 8, valeur: 300 },
      { id: 9, valeur: 200 },
      { id: 10, valeur: 1200 },
      { id: 8, valeur: 300 },
      { id: 9, valeur: 200 },
      { id: 10, valeur: 1200 },
    ];

    // --- Plus tard, appel à l’API ---
    // this.coinsService.getCoins().subscribe(data => {
    //   this.coins = data;
    // });
  }

  modifierCoin(id: number) {
    console.log('Modifier coin', id);
    // plus tard, ouvre un modal ou route vers formulaire
  }

  supprimerCoin(id: number) {
    console.log('Supprimer coin', id);
    // plus tard, appel API DELETE
  }
  afficherFormulaire = false;

  ouvrirFormulaire() {
    this.afficherFormulaire = true;
  }

  fermerFormulaire() {
    this.afficherFormulaire = false;
  }
}
