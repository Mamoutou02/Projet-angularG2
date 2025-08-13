import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {Sidebar} from "../sidebar/sidebar";
import {Header} from "../header/header";
import { HttpClient } from '@angular/common/http';
import id from '@angular/common/locales/extra/id';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-idee-de-projet',
  imports: [CommonModule, Sidebar, Header, FormsModule],
  templateUrl: './idee-de-projet.html',
  styleUrls: ['./idee-de-projet.css']
})
export class IdeeDeProjet {

  idees: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllIdeeProjet();

  }

  getAllIdeeProjet(){
    const apiUrl = `http://localhost:8080/api/idee-projets`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (res) => {
        this.idees = res;
        console.log('Projets reçus :', this.idees);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets', err);
      }
    });
  }

  deleteIdeeProjet(id: number) {
  if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
    this.http.delete(`http://localhost:8080/api/idee-projets/${id}`, { responseType: 'text' })
      .subscribe({
        next: () => {
          
          this.idees = this.idees.filter(idee => idee.idIdeeProjet !== id);
          alert('Projet supprimé avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          alert('Erreur lors de la suppression du projet');
        }
      });
  }
}




}
