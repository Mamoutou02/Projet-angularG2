import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-popup-add-comment',
  imports: [FormsModule],
  templateUrl: './popup-add-comment.html',
  styleUrl: './popup-add-comment.css'
})
export class PopupAddComment {

  commentaire: string = '';

  @Output() sendComment = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  envoyer() {
    if (this.commentaire.trim()) {
      this.sendComment.emit(this.commentaire.trim());
      this.commentaire = '';
    }
  }

  fermer() {
    this.close.emit();
  }

}
