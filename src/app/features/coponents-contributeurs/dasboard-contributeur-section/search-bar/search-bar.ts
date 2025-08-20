import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  protected readonly faSearch = faSearch;
  searchText = '';
  suggestions = ['Appli Recettes', 'TaskFlow', 'Dashboard IA', 'Gestion Notes'];
  filteredSuggestions: string[] = [];

  @Output() searchValidated = new EventEmitter<string>();

  constructor(private eRef: ElementRef) {}

  onSearch() {
    const query = this.searchText.trim().toLowerCase();
    if (query.length === 0) {
      this.filteredSuggestions = []; // Vide → cacher les suggestions
      return;
    }
    this.filteredSuggestions = this.suggestions.filter(s =>
      s.toLowerCase().includes(query)
    );
  }

  selectSuggestion(suggestion: string) {
    this.searchText = suggestion;
    this.filteredSuggestions = [];
    this.searchValidated.emit(suggestion); // envoyer la suggestion au parent
  }

  // Appuyer sur Entrée → envoyer la recherche
  onSearchValidate() {
    if (this.searchText.trim()) {
      this.searchValidated.emit(this.searchText.trim());
    }
    this.filteredSuggestions = [];
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.filteredSuggestions = [];
    }
  }
}
