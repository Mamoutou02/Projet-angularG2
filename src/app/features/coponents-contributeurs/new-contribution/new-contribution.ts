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
    
    const formData = new FormData();
    formData.append('idFonctionnalite', this.fonctionnaliteId.toString());
    formData.append('idProjet', this.projetId.toString());
    formData.append('idContributeur', this.idContributeur.toString());
    formData.append('titre', this.contribution.titre);
    formData.append('description', this.contribution.description);
    formData.append('type', this.contributionType);

    if (this.contributionType === 'file' && this.contribution.fichier) {
      formData.append('fichier', this.contribution.fichier);
      formData.append('contenu', this.contribution.fichier.name);
    } else if (this.contributionType === 'link') {
      formData.append('contenu', this.contribution.lien || '');
    }

    this.http.post('http://localhost:8080/api/contributions/deposer', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * event.loaded / (event.total || 1));
        } else if (event.type === HttpEventType.Response) {
          this.uploadSuccess = true;
          this.submit.emit();
          setTimeout(() => this.close.emit(), 1500);
        }
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