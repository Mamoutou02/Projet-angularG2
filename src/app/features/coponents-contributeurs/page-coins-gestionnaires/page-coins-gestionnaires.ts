import { Component, OnInit } from '@angular/core';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormAjoutCoin } from '../form-ajout-coin/form-ajout-coin';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Coin {
  idCoin: number;
  nombreCoins: number;
  dateAcquisition: string;
}

interface Contributeur {
  id: number;
  email: string;
}

interface Contribution {
  idContribution: number;
  titre: string;
  statutC: string;
  dateSoumission: string;
  contributeur: Contributeur;
  coins: Coin[];
}

@Component({
  selector: 'app-page-coins-gestionnaires',
  imports: [FaIconComponent, CommonModule, FormAjoutCoin],
  templateUrl: './page-coins-gestionnaires.html',
  standalone: true,
  styleUrls: ['./page-coins-gestionnaires.css']
})
export class PageCoinsGestionnaires implements OnInit {

  protected readonly faDeleteLeft = faDeleteLeft;

  contributions: Contribution[] = [];
  afficherFormulaire = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getAllContributions();
  }

  getAllContributions() {
    const idGest = Number(localStorage.getItem('id'));
    const apiUrl = `http://localhost:8080/api/coins/gestionnaire/${idGest}`;
    this.http.get<Contribution[]>(apiUrl).subscribe({
      next: (res) => {
        this.contributions = res;
      },
      error: (err) => {
        console.error('Erreur', err);
        alert('Une erreur est survenue');
      }
    });
  }

  modifierCoin(id: number) {
    console.log('Modifier coin', id);
    // plus tard, ouvre un modal ou route vers formulaire
  }

  supprimerCoin(id: number) {
    console.log('Supprimer coin', id);
    // plus tard, appel API DELETE
  }

  ouvrirFormulaire() {
    this.afficherFormulaire = true;
  }

  fermerFormulaire() {
    this.afficherFormulaire = false;
  }
}
