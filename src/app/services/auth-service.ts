import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; 

  private apiUrls = 'http://localhost:8080/api/admin/login'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
  return this.http.post<{ token: string, role: string, message: string }>(
    `${this.apiUrl}/login`,
    { email, password }
  );
}

}
