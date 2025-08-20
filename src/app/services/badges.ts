import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Badge {
  id: number;
  description: string;
  imageUrl: string;
  coins: number;
  type: string;
  administrateurId: number;
}

export interface BadgeDTO {
  description: string;
  coins: number;
  type: string;
  administrateurId: number;
  imageFile?: File;
}

@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  private apiUrl = 'http://localhost:8080/api/badges';

  constructor(private http: HttpClient) { }

  getAllBadges(): Observable<Badge[]> {
    return this.http.get<Badge[]>(this.apiUrl);
  }

  getBadgeById(id: number): Observable<Badge> {
    return this.http.get<Badge>(`${this.apiUrl}/${id}`);
  }

  createBadge(badgeData: FormData, adminId: number): Observable<Badge> {
    return this.http.post<Badge>(`${this.apiUrl}/administrateur/${adminId}`, badgeData);
  }

  deleteBadge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}