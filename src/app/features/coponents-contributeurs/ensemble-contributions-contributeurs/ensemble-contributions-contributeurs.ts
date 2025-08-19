import { Component, OnInit } from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Contribution {
  projet: string;
  date: string;
  fonctionnalite: string;
  description: string;
  statut: string;
  active?: boolean; // Optionnel pour mettre une carte en surbrillance
}

@Component({
  selector: 'app-ensemble-contributions-contributeurs',
  templateUrl: './ensemble-contributions-contributeurs.html',
  styleUrls: ['./ensemble-contributions-contributeurs.css'],
  imports: [
    NgClass,
    CommonModule
  ],
  standalone: true
})
export class EnsembleContributionsContributeurs implements OnInit {

  contributionss: any[] = [];

  ngOnInit() {
    
    this.getContributionsParProjet();
  }

  constructor(private http: HttpClient) {}

  
  getContributionsParProjet() {
    const idContributeur = Number(localStorage.getItem('id'));
    this.http.get<any[]>(`http://localhost:8080/api/contributions/contributeur/${idContributeur}`)
      .subscribe({
        next: (response) => {
          this.contributionss = response;
          console.log('Contributions:', this.contributionss);
        },
        error: (error) => console.error('Erreur:', error)
      });
  }

}
