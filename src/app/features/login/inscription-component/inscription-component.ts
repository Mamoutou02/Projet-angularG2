import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
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
  router: any;

  constructor(private http: HttpClient, router: Router) {}

  onSubmit() {
    const apiUrl = 'http://localhost:8080/api/contributeurs/inscription';

    this.http.post(apiUrl, this.formData).subscribe({
      next: (res) => {
        console.log('Inscription réussie', res);
        alert('Inscription réussie ');
        // Redirection vers la page de login après inscription réussie
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur', err);
        alert('Une erreur est survenue ');
      }
    });
  }
}
