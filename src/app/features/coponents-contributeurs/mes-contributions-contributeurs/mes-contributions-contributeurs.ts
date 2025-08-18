import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NewContribution } from '../new-contribution/new-contribution';
import { FonctionnaliteService } from '../../../services/fonctionnalite';

export interface Contribution {
  icon: string;
  title: string;
  date: string;
  description: string;
  status: string;
  statusText: string;
  auteur: string;
  featureId?: number; // ⚡ pour faire le lien avec la fonctionnalité
}

@Component({
  selector: 'app-mes-contributions-contributeurs',
  standalone: true,
  imports: [CommonModule, RouterLink, NewContribution],
  templateUrl: './mes-contributions-contributeurs.html',
  styleUrls: ['./mes-contributions-contributeurs.css']
})
export class MesContributionsContributeurs {

  activeTab: string = 'contribution';
  contributions: Contribution[] = [];

  fonctionnalites: any[] = [];
  mesFonctionnalites: any[] = [];         // réservées par moi
  fonctionnalitesDisponibles: any[] = []; // libres
  fonctionnalitesReservees: any[] = [];   // réservées par d’autres

  isModalOpen = false;
selectedFonctionnaliteId: number | null = null;
nouvelleDescription: string = '';

ouvrirModalAjouter() {
  this.isModalOpen = true;
  this.selectedFonctionnaliteId = null;
  this.nouvelleDescription = '';
}

fermerModal() {
  this.isModalOpen = false;
}

ajouterContribution() {
  if (!this.selectedFonctionnaliteId) {
    alert("Veuillez sélectionner une fonctionnalité !");
    return;
  }

  this.http.post(`http://localhost:8080/api/contributions`, {
    fonctionnaliteId: this.selectedFonctionnaliteId,
    contributeurId: this.idContributeur,
    description: this.nouvelleDescription
  }).subscribe(res => {
    console.log("Contribution ajoutée", res);
    this.fermerModal();
     // recharge la liste
  }, err => {
    console.error("Erreur lors de l'ajout", err);
  });
}

  idContributeur: number = Number(localStorage.getItem('id'));


  // Gestion du modal contribution
  
  selectedProjetId: number | null = null;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private route: ActivatedRoute,
    private fonctionnaliteService: FonctionnaliteService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const idProjet = params['projetId'];
      if (idProjet) {
        this.GetContributionsParProjet(Number(idProjet));
        this.GetFonctionnalitesParProjet(Number(idProjet));
      }
    });
  }

  // -------------------
  // Onglets
  // -------------------
  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  // -------------------
  // Contributions
  // -------------------
  GetContributionsParProjet(idProjet: number) {
    this.http.get<any[]>(`http://localhost:8080/api/contributions/projet/${idProjet}/contributeur/${this.idContributeur}`)
      .subscribe(
        (response) => {
          console.log('Contributions brutes:', response);
          this.contributions = response.map(item => ({
            icon: "fa-coins",
            title: item.titre,
            date: item.dateSoumission,
            description: item.type,
            status: item.statutC.toLowerCase(),
            statusText: item.statutC,
            auteur: item.contributeur.email,
            featureId: item.fonctionnalite?.id // ⚡ très utile pour savoir sur quelle fonctionnalité la contribution porte
          }));
        },
        (error) => {
          console.error('Erreur lors de la récupération des contributions:', error);
        }
      );
  }

  openContributionDetails(contribution: Contribution): void {
    this.router.navigate(['/contribution-details'], {
      state: { contributionData: contribution }
    });
  }

  // -------------------
  // Fonctionnalités
  // -------------------
  GetFonctionnalitesParProjet(idProjet: number) {
    this.http.get<any[]>(`http://localhost:8080/api/fonctionnalites/projet/${idProjet}`)
      .subscribe(
        (response) => {
          console.log('Fonctionnalites brutes:', response);
          this.fonctionnalites = response;

          this.mesFonctionnalites = this.fonctionnalites.filter(
            f => f.contributeur?.id === this.idContributeur
          );

          this.fonctionnalitesDisponibles = this.fonctionnalites.filter(
            f => f.statut === 'DISPONIBLE'
          );

          this.fonctionnalitesReservees = this.fonctionnalites.filter(
            f => f.statut !== 'DISPONIBLE' && f.contributeur?.id !== this.idContributeur
          );

          console.log('Mes fonctionnalités:', this.mesFonctionnalites);
        },
        (error) => {
          console.error('Erreur lors de la récupération des fonctionnalites:', error);
        }
      );
  }

  reserverFonctionnalite(idFonctionnalite: number) {
    this.http.post(`http://localhost:8080/api/fonctionnalites/${idFonctionnalite}/reserver/${this.idContributeur}`, {})
      .subscribe(
        res => {
          console.log('Réservation réussie', res);
          const idProjet = this.route.snapshot.queryParams['projetId'];
          this.GetFonctionnalitesParProjet(Number(idProjet));
        },
        err => {
          if (err.status === 400) {
            alert("Cette fonctionnalité est déjà réservée !");
          } else {
            console.error('Erreur réservation', err);
          }
        }
      );
  }

  // -------------------
  // Contribution Modal
  // -------------------
  openContributionModal(fonctionnaliteId: number, projetId: number) {
    this.selectedFonctionnaliteId = fonctionnaliteId;
    this.selectedProjetId = projetId;
    this.isModalOpen = true;
  }

  closeContributionModal() {
    this.isModalOpen = false;
    this.selectedFonctionnaliteId = null;
    this.selectedProjetId = null;
  }

  // -------------------
  // Utils
  // -------------------
hasContributed(foncId: number): boolean {
  return this.contributions.some(c => c.featureId === foncId && c.statusText !== 'EN_ATTENTE');
}


}
