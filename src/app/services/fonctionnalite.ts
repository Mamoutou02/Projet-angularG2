import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fonctionnalite {
  id: number;
  fonctionnaliteDescription: string;
  pointFonctionnalite: number;
  statut: string;
  projet?: { id: number }; // Le projet lié à la fonctionnalité
  contributeur?: { id: number, email: string };
}

@Injectable({
  providedIn: 'root'
})
export class FonctionnaliteService {

  private apiUrl = 'http://localhost:8080/api/fonctionnalites'; // adapte selon ton backend

  constructor(private http: HttpClient) { }

  // Récupérer une fonctionnalité par son ID
  getFonctionnaliteById(id: number): Observable<Fonctionnalite> {
    return this.http.get<Fonctionnalite>(`${this.apiUrl}/${id}`);
  }

}
