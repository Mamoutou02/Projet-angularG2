import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import { HttpClient } from '@angular/common/http';
interface Demande {
  name: string;
  type: string;
}

@Component({
  selector: 'app-page-demandes-gestionnaires',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './page-demandes-gestionnaires.html',
  standalone: true,
  styleUrl: './page-demandes-gestionnaires.css'
})
export class PageDemandesGestionnaires {
  demandes: Demande[] = [
    { name: 'Djénèba Haidara', type: 'Demande à contribuer' },
    { name: 'Aissata Koné', type: 'Demande à contribuer' },
    { name: 'Oumar Dolo', type: 'Demande à contribuer' },
    { name: 'Daba Diallo', type: 'Demande à contribuer' },
    { name: 'Mamoutou Sangaré', type: 'Demande à contribuer' }
  ];

  valider(demande: Demande) {
    console.log('Valider :', demande);
    // plus tard : requête API pour valider la demande
  }



  refuser(demande: Demande) {
    console.log('Refuser :', demande);
    // plus tard : requête API pour refuser la demande
  }

  protected readonly faEye = faEye;

  @Input() DemandesId!: number;

  Demandes : any[] = [];

  constructor(private http : HttpClient){}

  ngOnInit(): void{
    this.getAllDemandes();
    this.ValiderDemande = this.ValiderDemande.bind(this);

  }

 ValiderDemande(idDemande: number) {
  const apiUrl = `http://localhost:8080/api/demandes/gestionnaire/accepter/${idDemande}`;
  this.http.put(apiUrl, {}).subscribe({
    next: (projet) => {
      console.log('Demande validée avec succès, projet créé :', projet);
      this.getAllDemandes(); 
    },
    error: (error) => {
      console.error('Erreur lors de la validation de la demande :', error);
    }
  });
}



  getAllDemandes(){
    const apiUrls = 'http://localhost:8080/api/demandes';
    this.http.get<any[]>(apiUrls).subscribe({
      next: (data) => {
        this.Demandes = data;
        console.log('Demandes récupérées avec succès :', data);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des demandes :', error);
      }
    });
  }
}
