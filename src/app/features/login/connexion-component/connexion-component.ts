import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Contributeur } from '../../../models/Contributeur';

@Component({
  selector: 'app-connexion-component',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './connexion-component.html',
  styleUrls: ['./connexion-component.css'] 
})
export class ConnexionComponent {
  formData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}


  // Détecter si c'est un admin (par exemple par email ou autre critère)
  onSubmit() {
    const email = this.formData.email;
    const password = this.formData.password;

    if (email === 'admin@example.com') {
        this.authService.loginAdmin(email, password).subscribe({
            next: (res) => {
                localStorage.setItem('token', res.token);
                localStorage.setItem('id', res.id.toString());
                localStorage.setItem('roles', JSON.stringify(res.roles));
                console.log('Connexion admin réussie', res);
                this.router.navigate(['/AdminDashboard']);
            },
            error: (err) => {
                console.error(err);
                alert('Email ou mot de passe admin incorrect');
            }
        });
    } else {
        this.authService.login(email, password).subscribe({
            next: (res) => {
                localStorage.setItem('token', res.token);
                localStorage.setItem('id', res.id.toString());
                localStorage.setItem('roles', JSON.stringify(res.roles));
                 // Stocker nom et prénom
    localStorage.setItem('nom', res.nom);
    if (res.prenom) {
      localStorage.setItem('prenom', res.prenom);
    }
                console.log('Connexion contributeur réussie', res);
                this.router.navigate(['/dashboardContributeur']);
            },
            error: (err) => {
                console.error(err);
                alert('Email ou mot de passe contributeur incorrect');
            }
        });
    }
}
}


