import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-actions',
  imports: [],
  templateUrl: './popup-actions.html',
  styleUrl: './popup-actions.css'
})
export class PopupActions {

  @Input() project: any;

  @Output() viewComments = new EventEmitter<any>();
  @Output() addComment = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  onViewComments() {
    this.viewComments.emit(this.project);
  }

  onAddComment() {
    this.addComment.emit(this.project);
  }

  fermerPopupActions() {
    this.close.emit();
  }

}
