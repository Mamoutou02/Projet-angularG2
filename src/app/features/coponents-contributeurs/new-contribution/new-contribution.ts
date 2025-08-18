import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-new-contribution',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './new-contribution.html',
  styleUrls: ['./new-contribution.css']
})
export class NewContribution implements OnInit {
  @Input() fonctionnaliteId!: number;
  @Input() projetId!: number;
  @Input() idContributeur!: number;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  contribution: any = {
    titre: '',
    description: '',
    fichier: null,
    lien: ''
  };
  contributionType: string = 'file';
  uploadProgress: number | null = null;
  uploadError: string | null = null;
  uploadSuccess: boolean = false;
  isUploading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    console.log(`Initialisation contribution - Fonctionnalité: ${this.fonctionnaliteId}, Projet: ${this.projetId}`);
  }

  onFileSelected(event: any): void {
    this.contribution.fichier = event.target.files[0];
  }

  onSubmit(): void {
  if (!this.fonctionnaliteId || !this.projetId) {
    this.uploadError = "IDs manquants";
    return;
  }

  this.isUploading = true;
  this.uploadError = null;
  this.uploadSuccess = false;

  // ✅ Mapper contributionType vers enum backend
  let typeContribution: string;
  if (this.contributionType === 'link') {
    typeContribution = 'DOCUMENT'; // backend accepte DOCUMENT
  } else if (this.contributionType === 'file') {
    typeContribution = 'EDITEUR'; // backend accepte EDITEUR
  } else {
    typeContribution = 'EDITEUR'; // valeur par défaut
  }

  // Construire l'objet JSON attendu par Spring
  const contributionPayload = {
    titre: this.contribution.titre,
    description: this.contribution.description,
    contenu: this.contributionType === 'file' ? this.contribution.fichier?.name : this.contribution.lien,
    type: typeContribution,
    projetId: this.projetId,
    contributeurId: this.idContributeur,
    motifRejet: null
  };

  this.http.post(
    `http://localhost:8080/api/contributions/idFonctionnalites/${this.fonctionnaliteId}/ajoutcontribution/autres`,
    contributionPayload,
    { observe: 'response' }
  ).subscribe({
    next: (response) => {
      this.uploadSuccess = true;
      this.submit.emit();
      setTimeout(() => this.close.emit(), 1500);
      alert("Ajouter avec success")
    },
    error: (error) => {
      this.isUploading = false;
      this.uploadError = error.error?.message || error.message || "Erreur lors du dépôt";
      console.error('Erreur:', error);
    }
  });
}
  onCancel(): void {
    this.close.emit();
  }
}