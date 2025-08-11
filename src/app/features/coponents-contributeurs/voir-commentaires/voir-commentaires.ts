import {Component, Input, OnInit} from '@angular/core';

interface Commentaire {
  auteur: string;
  date: string;
  message: string;
}

@Component({
  selector: 'app-voir-commentaires',
  imports: [],
  templateUrl: './voir-commentaires.html',
  standalone: true,
  styleUrl: './voir-commentaires.css'
})
export class VoirCommentaires implements OnInit{
  commentaires: Commentaire[] = [];

  ngOnInit(): void {
    // Commentaires simulés
    this.commentaires = [
      {
        auteur: 'Djass Koné',
        date: '18:45 31 juillet 2025',
        message: 'Cette idée est vraiment innovant système qui permet de faire recommandation'
      },
      {
        auteur: 'Ramata Konaré',
        date: '19:00 31 juillet 2025',
        message: "Cette idée n'est aussi innovante de nos jours cela n'a pas trop d'impact actuellement"
      },
      {
        auteur: 'Daba Diallo',
        date: '20:25 31 juillet 2025',
        message: "Je supporte cette idée car sa parait très important et c'est une solution d'actualité"
      }
    ];
  }

}
