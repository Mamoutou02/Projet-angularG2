import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CommonModule, NgForOf } from '@angular/common';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ProjetSelectionService } from '../../../services/projet-selection-service-';

interface Contribution {
  idContribution: number;
  statutC: string;
  titre: string;
  contributeur: {
    nom: string;
    prenom: string;
  };
}

@Component({
  selector: 'app-page-contributions-gestionnaires',
  imports: [
    FaIconComponent,
    NgForOf,
    CommonModule
  ],
  templateUrl: './page-contributions-gestionnaires.html',
  standalone: true,
  styleUrls: ['./page-contributions-gestionnaires.css']
})
export class PageContributionsGestionnaires {

  contributions: Contribution[] = [];
  protected readonly faEye = faEye;

  constructor(
    private http: HttpClient,
    private projetSelectionService: ProjetSelectionService
  ) {}

  ngOnInit(): void {
    this.projetSelectionService.projetId$.subscribe(idProjet => {
      if (idProjet !== null) {
        this.getContributionsByProjet(idProjet);
      }
    });
  }

  getContributionsByProjet(idProjet: number) {
    const apiUrl = `http://localhost:8080/api/contributions/projet/${idProjet}`;
    this.http.get<Contribution[]>(apiUrl).subscribe({
      next: (res) => {
        this.contributions = res;
        console.log('Contributions du projet :', this.contributions);
      },
      error: (err) => console.error(err)
    });
  }

  valider(contribution: Contribution) {
    const apiUrl = `http://localhost:8080/api/contributions/valider/${contribution.idContribution}`;
    this.http.put(apiUrl, {}).subscribe({
      next: (res) => {
        console.log('Contribution validée :', res);
        contribution.statutC = 'VALIDEE'; // Mettre à jour localement
        alert("Contribution validée avec succès");
      },
      error: (err) => console.error(err)
    });
  }

  refuser(contribution: Contribution) {
    const apiUrl = `http://localhost:8080/api/contributions/rejeter/${contribution.idContribution}`;
    this.http.put(apiUrl, {}).subscribe({
      next: () => {
        console.log('Contribution rejetée');
        this.contributions = this.contributions.filter(c => c.idContribution !== contribution.idContribution); // Retirer du tableau
      },
      error: (err) => console.error(err)
    });
  }
}
