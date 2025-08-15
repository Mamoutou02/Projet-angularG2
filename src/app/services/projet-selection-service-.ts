// projet-selection.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjetSelectionService {
  private projetIdSource = new BehaviorSubject<number | null>(null);
  projetId$ = this.projetIdSource.asObservable();

  selectProjet(id: number) {
    this.projetIdSource.next(id);
  }

  // Récupérer l'ID du projet actuellement sélectionné
  getSelectedProjet(): number | null {
    return this.projetIdSource.value;
  }
  
}

