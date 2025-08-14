import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-connexion-component',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule
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
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    this.authService.login(this.formData.email, this.formData.password)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('id', res.id.toString());
          localStorage.setItem('roles', JSON.stringify(res.roles));
          console.log('Connexion réussie', res);

          
          this.snackBar.open(' Connexion réussie ! Bienvenue ', '', {
            duration: 4000,
            panelClass: ['custom-snackbar']
          });

          // Redirection selon le rôle
          if (res.roles.includes('Administrateur')) {
            this.router.navigate(['/AdminDashboard']);
          } else if (res.roles.includes('Gestionnaire')) {
            this.router.navigate(['/dashboardContributeur']);
          } else if (res.roles.includes('Contributeur')) {
            this.router.navigate(['/dashboardContributeur']);
          } else {
            this.router.navigate(['/Connexion']);
          }
        },
        error: (err) => {
          this.snackBar.open('❌ Identifiants incorrects', '', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
  }
}
