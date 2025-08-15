import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contributeur } from '../models/Contributeur';
 // crée ou adapte ce modèle

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/contributeurs';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{
    token: string,
    roles: string[],
    message: string,
    id: number,
    nom: string,
    prenom?: string
  }> {
    return this.http.post<{
      token: string,
      roles: string[],
      message: string,
      id: number,
      nom: string,
      prenom?: string
    }>(`${this.apiUrl}/connexion`, { email, password });
  }

  loginAdmin(email: string, password: string): Observable<{
  id: number;
  roles: string[];
  nom: string;
  email: string;
  token: string;
}> {
  return this.http.post<{
    id: number;
    roles: string[];
    nom: string;
    email: string;
    token: string;
  }>('http://localhost:8080/admin/login', { email, password });
}


 


  getContributeurParId(id: number): Observable<Contributeur> {
    return this.http.get<Contributeur>(`${this.apiUrl}/${id}`);
  }
}
