import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { FileUploadService } from './file-upload.service';

interface ContributionPayload {
  idFonctionnalite: number;
  idProjet: number;
  idContributeur: number;
  urlCode: string;
  titre: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-new-contribution',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-contribution.html',
  styleUrls: ['./new-contribution.css']
})
export class NewContribution implements OnInit {
  fonctionnaliteId!: number;
  projetId!: number;

 @Output() close = new EventEmitter<void>();

  contributionType: 'file' | 'link' = 'file';
  uploadProgress: number | null = null;
  isUploading = false;
  uploadSuccess = false;
  uploadError: string | null = null;

  contribution = {
    description: '',
    fichier: null as File | null,
    lien: '',
    titre: ''
  };

  constructor(
    private router: Router,
    private uploadService: FileUploadService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

   ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.fonctionnaliteId = +params['fonctionnaliteId'];
      this.projetId = +params['projetId'];

      console.log('ngOnInit - fonctionnaliteId:', this.fonctionnaliteId);
      console.log('ngOnInit - projetId:', this.projetId);
    });
  }

  isFormValid(): boolean {
    if (!this.contribution.description) return false;
    return this.contributionType === 'file' ? !!this.contribution.fichier : !!this.contribution.lien;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) this.contribution.fichier = input.files[0];
  }

  onFileUpload(): Observable<string> {
    if (!this.contribution.fichier) return of('');

    this.isUploading = true;
    return this.uploadService.uploadFile(this.contribution.fichier).pipe(
      map(event => {
        if (event.type === HttpEventType.Response) {
          this.isUploading = false;
          this.uploadSuccess = true;
          return (event.body as any)?.fileUrl ?? '';
        }
        return '';
      }),
      catchError(err => {
        this.uploadError = err.message || 'Échec du téléversement';
        this.isUploading = false;
        return of('');
      })
    );
  }

  onSubmit() {
    if (!this.isFormValid()) { alert('Veuillez remplir tous les champs'); return; }
    if (!this.fonctionnaliteId || !this.projetId) { alert('ID fonctionnalité ou projet manquant'); return; }
    if (this.isUploading) { alert('Téléversement en cours, patientez'); return; }

    const contributeurId = Number(localStorage.getItem('id'));
    const createContribution = (urlCode: string) => {
      const payload: ContributionPayload = {
        idFonctionnalite: this.fonctionnaliteId!,
        idProjet: this.projetId!,
        idContributeur: contributeurId,
        urlCode,
        titre: this.contribution.titre,
        type: this.contributionType === 'link' ? 'Lien' : 'Fichier',
        description: this.contribution.description
      };

      console.log('Payload contribution:', payload);

      this.http.post<any>('http://localhost:8080/api/contributions/deposer', payload).subscribe({
        next: res => {
          console.log('Contribution créée:', res);
          this.router.navigate(['/MescontributionsContributeurs']);
        },
        error: err => {
          console.error('Erreur création contribution', err);
          if (err.error?.message?.includes('déjà déposé')) {
            alert("Vous avez déjà déposé une contribution pour cette fonctionnalité.");
          }
        }
      });
    };

    if (this.contributionType === 'file') {
      this.onFileUpload().subscribe(fileUrl => createContribution(fileUrl));
    } else {
      createContribution(this.contribution.lien);
    }
  }

  closeModal() { this.close.emit(); }
  isModalOpen(): boolean { return this.uploadProgress !== null; }
}
