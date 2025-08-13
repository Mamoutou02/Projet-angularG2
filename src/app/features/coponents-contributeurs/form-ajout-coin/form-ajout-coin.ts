import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-form-ajout-coin',
  imports: [],
  templateUrl: './form-ajout-coin.html',
  standalone: true,
  styleUrl: './form-ajout-coin.css'
})
export class FormAjoutCoin {
  @Output() fermer = new EventEmitter<void>();

  annuler() {
    this.fermer.emit();
  }

}
