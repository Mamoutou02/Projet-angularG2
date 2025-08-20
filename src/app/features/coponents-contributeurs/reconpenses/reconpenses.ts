import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrophy, faShield, faCoins, faMedal, faLock } from '@fortawesome/free-solid-svg-icons';
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
  faLock = faLock;

  badgess: Badge[] = [];
  coins: Coin[] = [];
  totalCoins: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    const idStr = localStorage.getItem('id');
      const id_contributeurs = Number(idStr);

    // Charger les badges
    const apiUrl = `http://localhost:8080/api/badges`;
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


  attribuerBadge(idContributeur: number, totalCoins: number) {
  let badgeNom = '';

  if (totalCoins <= 90) {
    badgeNom = 'Badge Or 3';
  } else if (totalCoins >= 90 && totalCoins < 200) {
    badgeNom = 'Badge Or 2';
  } else if (totalCoins >= 200 && totalCoins < 500) {
    badgeNom = 'Badge Expert ';
  } else if (totalCoins >= 500) {
    badgeNom = 'Expert';
  }

  if (badgeNom) {
    const apiAttribBadge = `http://localhost:8080/api/badges/attribuer/${idContributeur}?totalCoins=${this.totalCoins}`;
   this.http.post(apiAttribBadge, {}).subscribe({
  next: (res) => {
    console.log("Badge attribué :", res);
    alert(`Badge attribué : ${badgeNom}`);
  },
  error: (err) => console.error("Erreur attribution badge", err)
});
  }
}
}
