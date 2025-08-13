import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/contributeurs';

  constructor(private http: HttpClient) {}

login(email: string, password: string) {
  return this.http.post<{ token: string, roles: string[], message: string, id: number }>(
    'http://localhost:8080/api/contributeurs/connexion',
    { email, password }
  );}
}
