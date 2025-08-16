import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  imports: [CommonModule, RouterLink],
  templateUrl: './mes-contributions-contributeurs.html',
  styleUrls: ['./mes-contributions-contributeurs.css']
})
export class MesContributionsContributeurs {

  activeTab: string = 'contribution';
  contributions: any[] = [];

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer projetId depuis queryParams
    this.route.queryParams.subscribe(params => {
  const idProjet = params['projetId'];
  if (idProjet) this.GetContributionsParProjet(Number(idProjet));
});
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  addNew(): void {
    this.router.navigate(['/new-contribution']);
    console.log('Ajouter une nouvelle contribution');
  }

  openContributionDetails(contribution: Contribution): void {
    this.router.navigate(['/contribution-details'], {
      state: { contributionData: contribution }
    });
  }

  GetContributionsParProjet(idProjet: number) {
    const idStr = localStorage.getItem('id');
    const idContributeur = Number(idStr);

    this.http.get<any[]>(`http://localhost:8080/api/contributions/projet/${idProjet}/contributeur/${idContributeur}`)
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
}
