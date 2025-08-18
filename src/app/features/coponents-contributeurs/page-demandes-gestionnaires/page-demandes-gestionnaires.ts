import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { HttpClient } from '@angular/common/http';
import { ProjetSelectionService } from '../../../services/projet-selection-service-';

interface Demande {
  idDemandeParticipation: number;
  typeDemandeParticipation: string;
  statutDemandeParticipation: string;
  datedemande: Date;
  description: string;
  typeDemandeParticipationemande?: string; // si tu veux afficher ce champ
  nomContributeur?: string;
}

@Component({
  selector: 'app-page-demandes-gestionnaires',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './page-demandes-gestionnaires.html',
  standalone: true,
  styleUrls: ['./page-demandes-gestionnaires.css']
})
export class PageDemandesGestionnaires {
  demandes: Demande[] = [];
  protected readonly faEye = faEye;

  constructor(
    private http: HttpClient,
    private projetSelectionService: ProjetSelectionService
  ) {}

  ngOnInit(): void {
    // S'abonner aux changements de projet sélectionné
    this.projetSelectionService.projetId$.subscribe((projetId) => {
      if (projetId) {
        this.getAllDemandes(projetId);
      } else {
        console.warn('Aucun projet sélectionné pour récupérer les demandes.');
      }
    });
  }

  getAllDemandes(projetId: number) {
    const apiUrl = `http://localhost:8080/api/demandes/projet/${projetId}`;
    this.http.get<Demande[]>(apiUrl).subscribe({
      next: (data) => {
        this.demandes = data;
        console.log('Demandes récupérées avec succès :', data);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des demandes :', error);
      }
    });
  }

  valider(idDemande: number) {
  const apiUrl = `http://localhost:8080/api/demandes/gestionnaire/accepter/${idDemande}`;
  this.http.put(apiUrl, null).subscribe({  // <-- null au lieu de {}
    next: (projet) => {
      console.log('Demande validée avec succès, projet créé :', projet);
      alert("Demande validée avec succès");
      const projetId = this.projetSelectionService.getSelectedProjet();
      if (projetId) this.getAllDemandes(projetId);
    },
    error: (error) => {
      console.error('Erreur lors de la validation de la demande :', error);
      alert("Erreur : " + (error.error?.message || error.message));
    }
  });
}

  refuser(demande: Demande) {
    const apiUrl = `http://localhost:8080/api/demandes/gestionnaire/rejeter/${demande.idDemandeParticipation}`;
    this.http.put(apiUrl, {}).subscribe({
      next: () => {
        console.log('Demande rejetée avec succès');
        const projetId = this.projetSelectionService.getSelectedProjet();
        if (projetId) this.getAllDemandes(projetId);
      },
      error: (error) => {
        console.error('Erreur lors du rejet de la demande :', error);
      }
    });
  }

  // Fonction utilitaire pour savoir si la demande est traitée
isDemandeTraitee(demande: any): boolean {
  return demande.statutDemandeParticipation === 'ACCEPTEE' || demande.statutDemandeParticipation === 'REFUSEE';
}

getButtonClass(demande: any): string {
  return this.isDemandeTraitee(demande) ? 'btn-valider-gris' : 'btn-valider-vert';
}

}
