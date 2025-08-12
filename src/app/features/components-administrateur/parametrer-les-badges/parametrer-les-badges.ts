import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Badge, BadgeService } from '../../../services/badges';
import { BadgesPopup } from '../badges-popup/badges-popup';

@Component({
  selector: 'app-parametrer-les-badges',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, BadgesPopup],
  templateUrl: './parametrer-les-badges.html',
  styleUrls: ['./parametrer-les-badges.css']
})
export class ParametrerLesBadges implements OnInit {

  showPopup = false;
  badges: any[] = [];

  constructor(private http: HttpClient) {}

  addBadge(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  onBadgeSubmitted(badgeData: any) {
    console.log('Données du badge reçues:', badgeData);
    this.badges.push(badgeData);
  }




  ngOnInit(): void {
    const apiUrl = 'http://localhost:8080/api/badges';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        console.log('Badges récupérés avec succès', response);
        this.badges = response;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des badges', error);
      }
    });
  }
}
