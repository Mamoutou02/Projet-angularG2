import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NewContribution } from '../new-contribution/new-contribution';
import { Fonctionnalite, FonctionnaliteService } from '../../../services/fonctionnalite';

export interface Contribution {
  icon: string;
  title: string;
  date: string;
  description: string;
  status: string;
  statusText: string;
  auteur: string;
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
  contributions: any[] = [];

  fonctionnalites: any[] = [];
  mesFonctionnalites: any[] = [];         // réservées par moi
  fonctionnalitesDisponibles: any[] = []; // libres
  fonctionnalitesReservees: any[] = [];   // réservées par d’autres

  idContributeur: number = Number(localStorage.getItem('id')); 

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private route: ActivatedRoute,
    private fonctionnaliteservice : FonctionnaliteService
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

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  addNew(): void {
    this.router.navigate(['/new-contribution']);
  }

  openContributionDetails(contribution: Contribution): void {
    this.router.navigate(['/contribution-details'], {
      state: { contributionData: contribution }
    });
  }

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
            auteur: item.contributeur.email
          }));
          console.log('Contributions formatées:', this.contributions);
        },
        (error) => {
          console.error('Erreur lors de la récupération des contributions:', error);
        }
      );
  }

  GetFonctionnalitesParProjet(idProjet: number) {
    this.http.get<any[]>(`http://localhost:8080/api/fonctionnalites/projet/${idProjet}`)
      .subscribe(
        (response) => {
          console.log('Fonctionnalites brutes:', response);
          this.fonctionnalites = response;

          // Mes fonctionnalités réservées
          this.mesFonctionnalites = this.fonctionnalites.filter(
            f => f.contributeur?.id === this.idContributeur
          );

          // Fonctionnalités disponibles
          this.fonctionnalitesDisponibles = this.fonctionnalites.filter(
            f => f.statut === 'DISPONIBLE'
          );

          // Fonctionnalités réservées par d’autres
          this.fonctionnalitesReservees = this.fonctionnalites.filter(
            f => f.statut !== 'DISPONIBLE' && f.contributeur?.id !== this.idContributeur
          );

          console.log('Mes fonctionnalités:', this.mesFonctionnalites);
          console.log('Fonctionnalités disponibles:', this.fonctionnalitesDisponibles);
          console.log('Fonctionnalités réservées:', this.fonctionnalitesReservees);
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
        if(err.status === 400) { // ou le code que tu renvoies côté backend
          alert("Cette fonctionnalité est déjà réservée !");
        } else {
          console.error('Erreur réservation', err);
        }
      }
    );
}

modalOuverte = false;
fonctionnaliteCourante!: string;

ouvrirModalContribution(idFonctionnalite: string) {
  this.fonctionnaliteCourante = idFonctionnalite;
  this.modalOuverte = true;
}

fermerModal() {
  this.modalOuverte = false;
}

 ouvrirContribution(fonctionnaliteId: string) {
    // Redirection vers la page/modal de contribution en passant l'ID
    this.router.navigate(['/nouvelle-contribution', fonctionnaliteId]);
  }

  // parent.component.ts
isModalOpen = false;
selectedFonctionnaliteId: number | null = null;
selectedProjetId: number | null = null;




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




hasContributed(foncId: string): boolean {
  return this.contributions.some(c => c.featureId === foncId && c.statusText !== 'EN_ATTENTE');
}




}
