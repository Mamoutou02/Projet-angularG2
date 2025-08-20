import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-badges-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './badges-popup.html',
  styleUrls: ['./badges-popup.css']
})
export class BadgesPopup implements OnInit {

  @Input() badgeToEdit: any | null = null; // Badge à modifier ou null si ajout
  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>();

  badge = {
    idBadge: null,
    nom: '',
    image: '',
    nombre: 0,
    description: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (this.badgeToEdit) {
      this.badge = { ...this.badgeToEdit }; // pré-remplir les champs
    }
  }

  close() {
    this.closed.emit();
  }

  setImageBasedOnNombre() {
    if (this.badge.nombre < 100) this.badge.image = 'assets/Badges01.jpeg';
    else if (this.badge.nombre < 200) this.badge.image = 'assets/Badges02.jpeg';
    else if (this.badge.nombre < 300) this.badge.image = 'assets/Badges03.jpeg';
    else if (this.badge.nombre < 400) this.badge.image = 'assets/Badges04.jpeg';
    else if (this.badge.nombre < 500) this.badge.image = 'assets/Badge.jpeg';
    else if (this.badge.nombre < 600) this.badge.image = 'assets/Baadge.png';
    else if (this.badge.nombre < 700) this.badge.image = 'assets/BadgeExpert.png';
  }

  onSubmit() {
    this.setImageBasedOnNombre();
    const idadmin = 1;

    if (this.badge.idBadge) {
      // Modification (PUT)
      const apiUrl = `http://localhost:8080/api/badges/${this.badge.idBadge}/administrateur/${idadmin}`;
      this.http.put(apiUrl, this.badge).subscribe({
        next: (response) => {
          alert('Badge modifié avec succès');
          this.submitted.emit(this.badge);
          this.close();
        },
        error: (error) => {
          console.error('Erreur modification', error);
          alert('Erreur lors de la modification du badge');
        }
      });
    } else {
      // Ajout (POST)
      const apiUrl = `http://localhost:8080/api/badges/administrateur/${idadmin}`;
      this.http.post(apiUrl, this.badge).subscribe({
        next: (response) => {
          alert('Badge ajouté avec succès');
          this.submitted.emit(this.badge);
          this.close();
        },
        error: (error) => {
          console.error('Erreur ajout', error);
          alert('Erreur lors de l\'ajout du badge');
        }
      });
    }
  }
}
