import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from './file-upload.service';
import {Location} from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { Contribution } from '../mes-contributions-contributeurs/mes-contributions-contributeurs';

@Component({
  selector: 'app-new-contribution',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-contribution.html',
  styleUrl: './new-contribution.css'
})
export class NewContribution {
  // Propriétés pour le suivi du téléversement
  uploadProgress: number | null = null;
  isUploading = false;
  uploadSuccess = false;
  uploadError: string | null = null;

  contribution = {
    icon: 'fa-lock',
    title: '',
    description: '',
    fonctionnalite: '',
    contenu: '',
    fichier: null as File | null,
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    statusText: 'En attente',
    auteur: ''
  };

   constructor(
   private router: Router,
   private uploadService: FileUploadService,
   private location: Location // Injection du service
   ) {} // Injection du Router

    onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validation du fichier
      if (file.size > 5 * 1024 * 1024) { // 5MB max
        alert('Le fichier est trop volumineux (max 5MB)');
        return;
      }

      this.contribution.fichier = file;
      console.log('Fichier sélectionné:', file.name);
    }
  }
// Méthode pour gérer le téléversement du fichier
  onFileUpload() {
    if (!this.contribution.fichier) {
       this.uploadError = 'Veuillez sélectionner un fichier';
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;
    this.uploadSuccess = false;
    this.uploadError = null;

  this.uploadService.uploadFile(this.contribution.fichier).subscribe({
    next: (event: HttpEvent<any>) => {
       if (event.type === HttpEventType.UploadProgress && event.total) {
        // TypeScript sait maintenant que event a les propriétés loaded et total
        this.uploadProgress = Math.round(100 * (event.loaded / (event.total)));
      }
      },
      // Gestion de la progression du téléversement
      error: (err) => {
      this.uploadError = err.message || 'Échec du téléversement';
        this.isUploading = false;
        this.uploadProgress = null;
      },
      // Gestion des erreurs
       complete: () => {
        this.uploadSuccess = true;
        this.isUploading = false;
        this.uploadProgress = null;
      }
    });
  }

  goBack(): void {
    //Logique de retour
    this.location.back(); // Retour à la page précédente
    console.log('Navigation retour');
  }

  closeModal() {
    // Logique pour fermer la modal
   this.location.back(); // Retour à la page précédente
   this.uploadProgress = null;
    console.log('Modal fermée');
  }


  // Méthode pour soumettre la contribution
onSubmit() {
    if (this.isUploading) {
      this.uploadError = 'Veuillez attendre la fin du téléversement';
      return;
    }
// Validation des champs requis
    console.log('Données soumises:', {
      ...this.contribution,
      fichier: this.contribution.fichier?.name
    });

    this.router.navigate(['/MesContributionsContributeurs']);
  }
}
