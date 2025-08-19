import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-demande-gestionnaire-administrateur',
  templateUrl: './demande-gestionnaire-administrateur.html',
  imports: [CommonModule],
  styleUrls: ['./demande-gestionnaire-administrateur.css']
})
export class DemandeGestionnaireAdministrateur {
  Demandes: any[] = [];
  AcceptedDemandes: any[] = [];
  loading = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDemandeGestionnaireAdministrateur();
  }

  getDemandeGestionnaireAdministrateur() {
    this.loading = true;
    this.http.get<any[]>('http://localhost:8080/api/demandes/gestionnaire').subscribe({
      next: (response) => {
        this.Demandes = response;
        this.AcceptedDemandes = this.Demandes.filter(d => 
          d.statutDemandeParticipation === 'EN_ATTENTE'
        );
        console.log('Demandes récupérées avec succès', this.AcceptedDemandes);
         // Vous pouvez également trier les demandes par date de création si nécessaire
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching demandes:', error);
        this.loading = false;
      }
    });
  }

  accepterDemande(demande: any) {
    const idAdmin = this.getAdminId();
    this.http.put<any>(
      `http://localhost:8080/admin/accepter-demande-gestionnaire/${demande.idDemandeParticipation}/admin/${idAdmin}`,
      {}
    ).subscribe({
      next: (projet) => {
        this.AcceptedDemandes= projet;
        console.log('Demandes acceptées mises à jour', this.AcceptedDemandes);
        this.getDemandeGestionnaireAdministrateur(); // Rafraîchir la liste
        alert('Demande acceptée avec succès');
      },
      error: (err) => {
        if (err.status === 409) { // Conflict
          alert('Ce projet existe déjà avec ces paramètres');
        } else {
          alert('Erreur inattendue');
        }
      }
    });
}

  annulerDemande(demande: any) {
    if (!demande || !demande.idDemande) {
      console.error('Demande ou ID de demande manquant');
      return;
    }

    // Implémentez la logique d'annulation ici
    console.log('Annulation de la demande', demande.idDemande);
  }

  private getAdminId(): number {
    // Implémentez cette méthode pour récupérer l'ID admin connecté
    // Exemple basique (à remplacer par votre vraie logique) :
    return 1; // ID temporaire pour le développement
  }
}