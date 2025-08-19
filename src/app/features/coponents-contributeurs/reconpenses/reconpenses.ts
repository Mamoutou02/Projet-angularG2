import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrophy, faShield, faCoins, faMedal } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Badge {
  nom: string;
  description: string;
  image: string;
  nombre: number;
}

interface Coin {
  idCoin: number;
  nombreCoins: number;
  // autres champs si besoin
}

@Component({
  selector: 'app-recompenses',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './reconpenses.html',
  styleUrls: ['./reconpenses.css']
})
export class Reconpenses {
  faTrophy = faTrophy;
  faShield = faShield;
  faCoins = faCoins;
  faMedal = faMedal;

  badgess: Badge[] = [];
  coins: Coin[] = [];
  totalCoins: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    const idStr = localStorage.getItem('id');
      const id_contributeurs = Number(idStr);

    // Charger les badges
    const apiUrl = `http://localhost:8080/api/badges/contributeur/${id_contributeurs}`;
    this.http.get<Badge[]>(apiUrl).subscribe({
      next: (res) => {
        this.badgess = res;
        console.log('Badges reçus :', this.badgess);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des badges', err);
      }
    });

    // Charger les coins
    const coinsApiUrl = `http://localhost:8080/api/coins/contributeur/${id_contributeurs}`;
    this.http.get<Coin[]>(coinsApiUrl).subscribe({
      next: (res) => {
        this.coins = res;
        console.log("coins =", this.coins);
        console.log("est-ce un tableau ?", Array.isArray(this.coins));
        console.log("length =", this.coins.length);

        // Calcul du total
        this.totalCoins = this.coins.reduce((acc, coin) => acc + coin.nombreCoins, 0);
        console.log("Total coins =", this.totalCoins);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des coins', err);
      }
    });
  }
}
