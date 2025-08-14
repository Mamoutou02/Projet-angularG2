import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  currentEditingBadge: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBadges();
  }

  loadBadges() {
    const apiUrl = 'http://localhost:8080/api/badges';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.badges = response;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des badges', error);
      }
    });
  }

  deleteBadge(badge: any): void {
    const apiUrl = `http://localhost:8080/api/badges/${badge.idBadge}`;
    this.http.delete(apiUrl).subscribe({
      next: (response) => {
        alert('Badge supprimé avec succès');
        this.badges = this.badges.filter(b => b.idBadge !== badge.idBadge);
        console.log('Badge supprimé', response);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du badge', error);
        alert('Erreur lors de la suppression du badge');
      }
    });
  }

  addBadge(): void {
    this.currentEditingBadge = null; // Aucun badge en édition
    this.showPopup = true;
  }

  editBadge(badge: any) {
    this.currentEditingBadge = { ...badge }; // clone pour éviter les modifications directes
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  onBadgeSubmitted(badgeData: any) {
    if (this.currentEditingBadge) {
      // Modification : remplacer le badge dans la liste
      const index = this.badges.findIndex(b => b.idBadge === badgeData.idBadge);
      if (index !== -1) {
        this.badges[index] = badgeData;
      }
    } else {
      // Ajout : pousser le nouveau badge
      this.badges.push(badgeData);
    }

    this.showPopup = false; // fermer le popup
  }
}
