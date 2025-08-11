import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inscription-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, HttpClientModule],
  templateUrl: './inscription-component.html',
  styleUrl: './inscription-component.css'
})
export class InscriptionComponent {

  formData = {
    nom: '',
    prenom: '',
    email: '',
    profil: '',
    niveau:'',
    password: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    const apiUrl = 'http://localhost:8080/api/contributeurs/inscription';

    this.http.post(apiUrl, this.formData).subscribe({
      next: (res) => {
        console.log('Inscription réussie', res);
        alert('Inscription réussie ');
      },
      error: (err) => {
        console.error('Erreur', err);
        alert('Une erreur est survenue ');
      }
    });
  }
}
