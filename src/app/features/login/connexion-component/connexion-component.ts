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
  this.authService.login(this.formData.email, this.formData.password)
    .subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('id', res.id.toString());
        localStorage.setItem('roles', JSON.stringify(res.roles));
        console.log('Connexion réussie', res);

        // Redirection selon le rôle
        if (res.roles.includes('Administrateur')) {
          this.router.navigate(['/AdminDashboard']);
        } else if (res.roles.includes('Gestionnaire')) {
          this.router.navigate(['/dashboardContributeur']);
        } else if (res.roles.includes('Contributeur')) {
          this.router.navigate(['/dashboardContributeur']);
        } else {
          // cas par défaut si rôle inconnu
          this.router.navigate(['/Connexion']);
        }
      },
      error: (err) => {
        alert(err.error.message || "Identifiants incorrects");
      }
    });
}




}
