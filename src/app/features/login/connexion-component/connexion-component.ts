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
   this.authService.login(this.formData.email, this.formData.password).subscribe({
  next: (res) => {
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);

    if (res.role === 'Administrateur') {
      this.router.navigate(['/AdminDashboard']);
    } else if (res.role === 'Contributeur') {
      this.router.navigate(['/dashboardContributeur']);
    }
  },
  error: () => {
    alert("Identifiants incorrects");
  }
});

  }


}
