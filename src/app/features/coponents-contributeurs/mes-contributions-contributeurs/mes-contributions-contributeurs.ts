import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NewContribution } from '../new-contribution/new-contribution';

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
  fonctionnalitesDisponibles: any[] = [];
  fonctionnalitesReservees: any[] = [];
  idContributeur: number = Number(localStorage.getItem('id'));
  currentProjectId: number | null = null;

  // Gestion de la modal
  isModalOpen = false;
  selectedFonctionnaliteId: number | null = null;


  // Gestion du modal contribution
  
  selectedProjetId: number | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentProjectId = params['projetId'] ? Number(params['projetId']) : null;
      if (this.currentProjectId) {
        this.loadData(this.currentProjectId);
      }
    });
  }

  private loadData(projectId: number): void {
    this.GetContributionsParProjet(projectId);
    this.GetFonctionnalitesParProjet(projectId);
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  openContributionDetails(contribution: any): void {
    this.router.navigate(['/contribution-details'], {
      state: { contributionData: contribution }
    });
  }

  GetContributionsParProjet(idProjet: number) {
    this.http.get<any[]>(`http://localhost:8080/api/contributions/projet/${idProjet}/contributeur/${this.idContributeur}`)
      .subscribe({
        next: (response) => {
          this.contributions = response.map(item => ({
            icon: "fa-coins",
            title: item.titre,
            date: item.dateSoumission,
            description: item.description || item.type,
            status: item.statutC?.toLowerCase(),
            statusText: item.statutC,
            featureId: item.fonctionnalite?.id
          }));
        },
        error: (error) => console.error('Erreur contributions:', error)
      });
  }

// Pas besoin de modifier la logique existante
// Juste s'assurer que fonctionnalitesReservees contient bien toutes les fonctionnalités réservées
GetFonctionnalitesParProjet(idProjet: number) {
  this.http.get<any[]>(`http://localhost:8080/api/fonctionnalites/projet/${idProjet}`)
    .subscribe({
      next: (response) => {
        this.fonctionnalites = response;
        
        // Fonctionnalités réservées (toutes, sans filtre supplémentaire)
        this.fonctionnalitesReservees = this.fonctionnalites.filter(
          f => f.statut === 'RESERVEE'
        );
        
        // Fonctionnalités disponibles
        this.fonctionnalitesDisponibles = this.fonctionnalites.filter(
          f => f.statut === 'DISPONIBLE'
        );
      },
      error: (error) => console.error('Erreur:', error)
    });
}

  private updateFonctionnalitesLists(): void {
    this.fonctionnalitesDisponibles = this.fonctionnalites.filter(
      f => f.statut === 'DISPONIBLE'
    );
    this.fonctionnalitesReservees = this.fonctionnalites.filter(
      f => f.statut !== 'DISPONIBLE'
    );
  }

  reserverFonctionnalite(idFonctionnalite: number) {
    this.http.post(`http://localhost:8080/api/fonctionnalites/${idFonctionnalite}/reserver/${this.idContributeur}`, {})
      .subscribe({
        next: () => this.currentProjectId && this.GetFonctionnalitesParProjet(this.currentProjectId),
        error: (err) => {
          if (err.status === 400) {
            alert("Cette fonctionnalité est déjà réservée !");
          } else {
            console.error('Erreur réservation', err);
          }
        }
      });
  }

  openContributionModal(fonctionnaliteId: number): void {
    this.selectedFonctionnaliteId = fonctionnaliteId;
    this.isModalOpen = true;
  }

  closeContributionModal(): void {
    this.isModalOpen = false;
    this.selectedFonctionnaliteId = null;
  }

  onContributionSubmitted(): void {
    if (this.currentProjectId) {
      this.loadData(this.currentProjectId);
    }
    this.closeContributionModal();
  }

  hasContributed(foncId: number): boolean {
    return this.contributions.some(c => c.featureId === foncId);
  }
  
}