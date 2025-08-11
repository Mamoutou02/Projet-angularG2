import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AuthService} from "../../../services/auth-service";
import { Badge, BadgeService } from '../../../services/badges';



@Component({
  selector: 'app-parametrer-les-badges',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './parametrer-les-badges.html',
  styleUrls: ['./parametrer-les-badges.css']
})
export class ParametrerLesBadges implements OnInit {
  showForm = false;
  badges: Badge[] = [];
  newBadge = {
    description: '',
    image: null as File | null,
    coins: 0,
    type: ''
  };

  badgeTypes = [
    'BRONZE_I', 'BRONZE_II', 'BRONZE_III',
    'ARGENT_I', 'ARGENT_II', 'ARGENT_III',
    'OR_I', 'OR_II', 'OR_III',
    'DIAMOND'
  ];

  currentAdminId: number = 1; // À remplacer par l'ID réel de l'admin connecté

  constructor(
      private badgeService: BadgeService,
      private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBadges();
    // this.currentAdminId = this.authService.getCurrentAdminId(); // À implémenter
  }

  loadBadges(): void {
    this.badgeService.getAllBadges().subscribe({
      next: (data) => this.badges = data,
      error: (error) => console.error('Erreur lors du chargement des badges:', error)
    });
  }

  onFileSelected(event: any): void {
    this.newBadge.image = event.target.files[0];
  }

  addBadge(): void {
    this.showForm = true;
  }

  cancelAdd(): void {
    this.showForm = false;
    this.resetForm();
  }

  submitBadge(): void {
    if (!this.newBadge.image) {
      alert('Veuillez sélectionner une image');
      return;
    }

    const formData = new FormData();
    formData.append('description', this.newBadge.description);
    formData.append('imageFile', this.newBadge.image);
    formData.append('coins', this.newBadge.coins.toString());
    formData.append('type', this.newBadge.type);
    formData.append('administrateurId', this.currentAdminId.toString());

    this.badgeService.createBadge(formData, this.currentAdminId).subscribe({
      next: () => {
        this.loadBadges();
        this.showForm = false;
        this.resetForm();
      },
      error: (error) => {
        console.error('Erreur lors de la création du badge:', error);
        alert('Erreur lors de la création du badge');
      }
    });
  }

  editBadge(badge: Badge): void {
    // À implémenter selon vos besoins
    console.log('Modification du badge:', badge);
  }

  deleteBadge(badgeId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce badge ?')) {
      this.badgeService.deleteBadge(badgeId).subscribe({
        next: () => this.loadBadges(),
        error: (error) => {
          console.error('Erreur lors de la suppression du badge:', error);
          alert('Erreur lors de la suppression du badge');
        }
      });
    }
  }

  private resetForm(): void {
    this.newBadge = {
      description: '',
      image: null,
      coins: 0,
      type: ''
    };
  }

  getBadgeClass(type: string): string {
    if (type.includes('BRONZE')) return 'bronze';
    if (type.includes('ARGENT')) return 'argent';
    if (type.includes('OR')) return 'or';
    if (type.includes('DIAMOND')) return 'diamond';
    return '';
  }
}