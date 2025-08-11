import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrophy, faShield, faCoins, faMedal } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Badge {
  title: string;
  coins: number;
  description: string;
  icon: IconProp;        // Typage FontAwesome
  iconColor?: string;    // Optionnel si vous utilisez les couleurs
}
@Component({
  selector: 'app-recompenses',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './reconpenses.html',
  styleUrl: './reconpenses.css'
})
export class Reconpenses {
  // Déclaration des icônes (elles satisfont l'interface IconProp)
  faTrophy = faTrophy;
  faShield = faShield;
  faCoins = faCoins;
  faMedal = faMedal;

  // Autres propriétés avec leurs types explicites
  totalCoins: number = 0;

    badges = [
    { title: 'Bronze_I', coins: 100, description: 'Pour avoir collecté 100 coins' },
    { title: 'Bronze_II', coins: 200, description: 'Pour avoir collecté 200 coins' },
    { title: 'Bronze_III', coins: 300, description: 'Pour avoir collecté 300 coins' },
  ];

}
