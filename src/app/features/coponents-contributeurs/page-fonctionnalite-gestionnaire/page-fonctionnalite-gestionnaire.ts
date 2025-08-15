import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAjoutFonctionnalites } from '../form-ajout-fonctionnalites/form-ajout-fonctionnalites';
import { HttpClient } from '@angular/common/http';
import { ProjetSelectionService } from '../../../services/projet-selection-service-';


interface Fonctionnalite {
  id: number;
  fonctionnaliteDescription: string;
  statut: string;
  pointFonctionnalite: number;
}

@Component({
  selector: 'app-page-fonctionnalite-gestionnaire',
  imports: [CommonModule, FormAjoutFonctionnalites],
  templateUrl: './page-fonctionnalite-gestionnaire.html',
  standalone: true,
  styleUrls: ['./page-fonctionnalite-gestionnaire.css']
})
export class PageFonctionnaliteGestionnaire implements OnInit {
  fonctionnalites: Fonctionnalite[] = [];
  afficherFormulaireAjout = false;

  constructor(
    private http: HttpClient,
    private projetSelectionService: ProjetSelectionService
  ) {}

  ngOnInit() {
    // Abonnement pour récupérer le projet sélectionné
    this.projetSelectionService.projetId$.subscribe(idProjet => {
      if (idProjet !== null) {
        this.getFonctionnalitesByProjet(idProjet);
      }
    });
  }

  

  getFonctionnalitesByProjet(idProjet: number) {
    const apiUrl = `http://localhost:8080/api/fonctionnalites/projet/${idProjet}`;
    this.http.get<Fonctionnalite[]>(apiUrl).subscribe({
      next: res => {
        this.fonctionnalites = res;
        console.log('Fonctionnalités du projet :', this.fonctionnalites);
      },
      error: err => console.error(err)
    });
  }

  ouvrirFormulaire() {
    this.afficherFormulaireAjout = true;
  }

  fermerFormulaire() {
    this.afficherFormulaireAjout = false;
  }
}
