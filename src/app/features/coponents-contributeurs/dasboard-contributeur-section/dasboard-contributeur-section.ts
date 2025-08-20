import { Component } from '@angular/core';
import { StatsCards } from './stats-cards/stats-cards';
import { SearchBar } from './search-bar/search-bar';
import { RecentProjects } from './recent-projects/recent-projects';
import { FormsModule } from '@angular/forms';
import { faDatabase, faProjectDiagram, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dasboard-contributeur-section',
  imports: [StatsCards, SearchBar, RecentProjects, FormsModule],
  templateUrl: './dasboard-contributeur-section.html',
  styleUrl: './dasboard-contributeur-section.css'
})
export class DasboardContributeurSection {

  protected readonly faProjectDiagram = faProjectDiagram;
  protected readonly faUsers = faUser;
  protected readonly faTrophy = faTrophy;
  protected readonly faDatabase = faDatabase;

  searchQuery: string = '';

  handleSearch(query: string) {
    this.searchQuery = query;
  }

  nom: string | null = null;
  prenom: string | null = null;

  ngOnInit() {
    this.nom = localStorage.getItem('nom');
    this.prenom = localStorage.getItem('prenom');
  }
}
