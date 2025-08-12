import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-badges-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './badges-popup.html',
  styleUrls: ['./badges-popup.css']
})
export class BadgesPopup {

  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>();

  badgeData = {
    nom: '',
    image: '',
    nombre: 0,
    description: ''
  };

  imagePreview: string | null = null;

  constructor(private http: HttpClient) { }

  close() {
    this.closed.emit();
  }

  

  onSubmit() {
   

    const idadmin = 1;
    const apiUrl = `http://localhost:8080/api/badges/administrateur/${idadmin}`;

    

    this.http.post(apiUrl, this.badgeData).subscribe({
      next: (response) => {
        console.log('Badge ajouté avec succès', response);
        alert('Badge ajouté avec succès');
        this.submitted.emit(this.badgeData);
        this.close();
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du badge', error);
        alert('Erreur lors de l\'ajout du badge');
      }
    });
  }
}
