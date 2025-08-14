import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

interface Domaine {
  idDomaine?: number;
  titre: string;
  description: string;
}

@Component({
  selector: 'app-domaines',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './domaines.html',
  styleUrls: ['./domaines.css']
})
export class Domaines implements OnInit {
  faPen = faPen;
  faTrash = faTrash;

  domaineData: Domaine = { titre: '', description: '' };
  domaineEnEdition: Domaine | null = null;
  domaines: Domaine[] = [];
  idAdmin = 1; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.chargerDomaines();
    this.supprimerDomaine = this.supprimerDomaine.bind(this);
  }

  get domaineFormData(): Domaine {
    return this.domaineEnEdition ?? this.domaineData;
  }

  chargerDomaines() {
    this.http.get<Domaine[]>('http://localhost:8080/api/domaines')
      .subscribe({
        next: res => this.domaines = res,
        error: err => console.error('Erreur chargement domaines', err)
      });
  }

  onSubmit() {
    if (!this.domaineFormData.titre || !this.domaineFormData.description) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers };

    if (this.domaineEnEdition && this.domaineEnEdition.idDomaine) {
      // Mode édition
      const updatePayload = {
        titre: this.domaineEnEdition.titre,
        description: this.domaineEnEdition.description
      };
      this.http.put<Domaine>(
        `http://localhost:8080/api/domaines/${this.domaineEnEdition.idDomaine}/admin/${this.idAdmin}`,
        updatePayload,
        httpOptions
      ).subscribe({
        next: () => {
          alert('Domaine modifié avec succès');
          this.annulerEdition();
          this.chargerDomaines();
        },
        error: err => {
          console.error('Erreur modification domaine', err);
          alert('Erreur lors de la modification');
        }
      });
    } else {
      // Mode création
      this.http.post<Domaine>(
        `http://localhost:8080/api/domaines/administrateur/${this.idAdmin}`,
        this.domaineData,
        httpOptions
      ).subscribe({
        next: () => {
          alert('Domaine ajouté avec succès');
          this.domaineData = { titre: '', description: '' };
          this.chargerDomaines();
        },
        error: err => {
          console.error('Erreur création domaine', err);
          alert('Erreur lors de la création');
        }
      });
    }
  }

  commencerEdition(domaine: Domaine) {
    this.domaineEnEdition = { ...domaine }; // clone pour édition
  }

  annulerEdition() {
    this.domaineEnEdition = null;
    this.domaineData = { titre: '', description: '' };
  }

  supprimerDomaine(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce domaine ?')) {
      this.http.delete(`http://localhost:8080/api/domaines/domaine/${id}`)
        .subscribe({
          next: () => {
            alert('Domaine supprimé');
            this.chargerDomaines();
          },
          error: err => {
            console.error('Erreur suppression domaine', err);
            alert('Erreur lors de la suppression');
          }
        });
    }
  }
}
