import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

@Component({
  selector: 'app-parametrer-notifications',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './parametrer-notifications.html',
  styleUrls: ['./parametrer-notifications.css']
})
export class ParametrerNotifications {
  notificationForm: FormGroup;
  isSubmitting = false;
  showSuccess = false;

  notificationData = {
    typeNotyf: '',
    description: '',
    dateCreation: dateTimestampProvider.now()
  };

   idAdmin = 1;


  notification : any[] = [];

  // Options pour les types de notifications
  notificationTypes = [
    { value: 'INSCRIPTION', label: 'INSCRIPTION' },
    { value: 'COMMENTAIRE', label: 'COMMENTAIRE' },
    { value: 'GAINCOINS', label: 'GAINCOINS' },
    { value: 'GAINBADGE', label: 'GAINBADGE' },
    { value: 'DEMANDERARTICIPATION', label: 'DEMANDERARTICIPATION' },
    { value: 'PROPOSITIONIDEEPROJET', label: 'PROPOSITIONIDEEPROJET' },
    { value: 'DEMANDECONTRIBUTION', label: 'DEMANDECONTRIBUTION' },
    { value: 'DEMADEACCEPTEE', label: 'DEMADEACCEPTEE' },
    { value: 'DEMANDEREJETEE', label: 'DEMANDEREJETEE' },
    { value: 'DEMANDEGESTIONNAIREACCENTEE', label: 'DEMANDEGESTIONNAIREACCENTEE' },
    { value: 'DEMANDEGESTIONNAIREREJETEE', label: 'DEMANDEGESTIONNAIREREJETEE' },
    { value: 'DEMANDEGESTIONNAIRE', label: 'DEMANDEGESTIONNAIRE' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.notificationForm = this.fb.group({
      typeNotyf: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', Validators.required]
    });
  }

onSubmit() {
  if (this.notificationForm.valid) {
    this.isSubmitting = true;

    // Récupérer les valeurs directement depuis le FormGroup
    const formValue = this.notificationForm.value;

    const payload = {
      typeNotyf: formValue.typeNotyf,
      description: formValue.description,
      dateCreation: formValue.date
    };

    this.http.post(`http://localhost:8080/api/notifications/administrateurs/${this.idAdmin}`, payload,{headers : new HttpHeaders({'Content-Type': 'application/json'})})
      .subscribe({
        next: (res) => {
          this.showSuccess = true;
          console.log('Notification envoyée avec succès', res);
          this.notificationForm.reset();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Erreur création notification', err);
          alert('Erreur lors de la création');
          this.isSubmitting = false;
        }
      });

  }
}


  

  ngOnInit(): void {
   
  }
}
