import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-unlock',
  imports: [CommonModule],
  templateUrl: './popup-unlock.html',
  styleUrl: './popup-unlock.css'
})
export class PopupUnlock {

  @Input() projectTitle: string = '';
  @Input() userCoins: number = 0;
  @Input() requiredCoins: number = 0;
  @Input() hasAccessLevel: boolean = true;

  @Output() close = new EventEmitter<void>();
  @Output() unlocked = new EventEmitter<void>();

  step: 'confirm' | 'success' | 'not-enough-coins' | 'no-access' = 'confirm';

  onConfirmUnlock() {
    if (!this.hasAccessLevel) {
      this.step = 'no-access';
    } else if (this.userCoins < this.requiredCoins) {
      this.step = 'not-enough-coins';
    } else {
      this.step = 'success';
      this.unlocked.emit();
    }
  }

  onClose() {
    this.close.emit();
  }
}
