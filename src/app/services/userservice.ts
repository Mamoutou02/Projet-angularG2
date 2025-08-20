import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class Userservice {
  private nomSubject = new BehaviorSubject<string | null>(null);
  private prenomSubject = new BehaviorSubject<string | null>(null);

  nom$ = this.nomSubject.asObservable();
  prenom$ = this.prenomSubject.asObservable();

  setUser(nom: string, prenom: string) {
    this.nomSubject.next(nom);
    this.prenomSubject.next(prenom);
  }

  
}
