import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { Projets } from '../../components-administrateur/projets/projets';


@Component({
  selector: 'app-projet-recents',
  imports: [FontAwesomeModule, RouterLink,CommonModule],
  templateUrl: './projet-recents.html',
  styleUrls: ['./projet-recents.css']
})
export class ProjetRecents {

  faEye = faEye;
  faArrowLeft = faArrowLeft;
  constructor(private router: Router, private http : HttpClient, private route : ActivatedRoute) {}

  retour() {
  this.router.navigate(['/ProjetsContributeurs']); // ou la route souhaitée
}
projets : any[] = [];


 ngOnInit(): void {
   const idProjet = history.state['projetId']; //  correct

    this.GetProjetsRejoints();
  }

GetProjetsRejoints() {
  const idStr = localStorage.getItem('id');
  const idNumber = Number(idStr)
  

  this.http.get<any[]>(`http://localhost:8080/api/demandes/projets-acceptes/${idNumber}`).subscribe(
    (response) => {
      console.log('Projets récents récupérés:', response);
      this.projets = response;

    },
    (error) => {
      console.error('Erreur lors de la récupération des projets récents:', error);
      alert('Erreur lors de la récupération des projets récents');
    }
  );
}

goToContributions(projetId: number) {
  this.router.navigate(['/MescontributionsContributeurs'], { queryParams: { projetId } });

}

}
