import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AuthService} from '../../../services/auth-service';

@Component({
  selector: 'app-connexion-component',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './connexion-component.html',
  styleUrl: './connexion-component.css'
})
export class ConnexionComponent {
  formData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.formData).subscribe({
      next: (res) => {
        console.log('Connexion réussie ', res);
        alert("Bienvenu");
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        // Redirection 
         this.router.navigate(['/dashboardContributeur']);
      },
      error: (err) => {
        console.error('Erreur de connexion ', err);
        alert(err.error?.message || 'Email ou mot de passe incorrect');
      }
    });
  }
}
