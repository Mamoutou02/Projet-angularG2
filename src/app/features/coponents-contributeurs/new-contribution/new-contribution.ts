import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from './file-upload.service';
import {Location} from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpEventType, HttpEvent } from '@angular/common/http';


interface Feature {
  id: string;
  name: string;
}

interface Contribution {
  icon: string;
  title: string;
  description: string;
  featureId: string;
  fonctionnalite: string;
  contenu: string;
  fichier: File | null;
  lien: string;
  date: string;
  status: string;
  statusText: string;
  auteur: string;
}
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
  contributionType: 'file' | 'link' = 'file';

  features: Feature[] = [
    { id: '1', name: 'Fonctionnalité 1' },
    { id: '2', name: 'Fonctionnalité 2' },
    { id: '3', name: 'Fonctionnalité 3' }
  ];

  contribution = {
    icon: 'fa-lock',
    title: '',
    description: '',
    featureId: '',
    fonctionnalite: '',
    contenu: '',
    fichier: null as File | null,
    lien: '',
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

// Méthode pour réinitialiser le lien et le fichier
   resetLink() {
    this.contribution.lien = '';
  }

  resetFile() {
    this.contribution.fichier = null;
  }

  // Méthode pour changer le type de contribution
isFormValid(): boolean {
    if (!this.contribution.featureId || !this.contribution.description) {
      return false;
    }

    if (this.contributionType === 'file') {
      return !!this.contribution.fichier;
    } else {
      return !!this.contribution.lien;
    }
  }

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
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      },
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

  if (!this.isFormValid()) {
    alert('Veuillez remplir tous les champs requis');
    return;
  }

  console.log('Données soumises:', {
    ...this.contribution,
    fichier: this.contribution.fichier?.name,
    type: this.contributionType
  });

  this.router.navigate(['/MesContributionsContributeurs']);
}
}