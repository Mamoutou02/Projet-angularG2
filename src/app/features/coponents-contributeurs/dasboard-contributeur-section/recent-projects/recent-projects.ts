import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faChartLine, faFolderOpen, faMagnifyingGlassChart, faStickyNote, faTasks, faUtensils, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../../../models/project';

@Component({
  selector: 'app-recent-projects',
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './recent-projects.html',
  styleUrl: './recent-projects.css'
})
export class RecentProjects implements OnInit {
  protected readonly faFolderOpen = faFolderOpen;
  protected readonly faUtensils = faUtensils;
  protected readonly faTasks = faTasks;
  protected readonly faArrowRight = faArrowRight;
  protected readonly faChartLine = faChartLine;
  protected readonly faStickyNote = faStickyNote;
  protected readonly faMagnifyingGlassChart = faMagnifyingGlassChart;
  protected readonly faProjectDiagram = faProjectDiagram;

  @Input() filteredQuery: string = '';

  projects: Project[] = [];
  visibleProjects: Project[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProjectsFromApi();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('filteredQuery' in changes) {
      const query = this.filteredQuery.trim().toLowerCase();
      if (query === '') {
        this.visibleProjects = this.projects.slice(0, 2);
      } else {
        const match = this.projects.find(p => p.name.toLowerCase() === query);
        this.visibleProjects = match ? [match] : [];
      }
    }
  }

  loadProjectsFromApi(): void {
    const apiUrl = 'http://localhost:8080/api/projets/allprojets';

    this.http.get<any[]>(apiUrl).subscribe({
      next: (res) => {
        this.projects = res.map(p => ({
          icon: this.faProjectDiagram,
          name: p.titre,
          description: p.description,
          completion: this.getCompletion(p)
        }));
        this.visibleProjects = this.projects.slice(0, 2);
        console.log('Projets chargés :', this.projects);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets', err);
      }
    });
  }

  getCompletion(projet: any): number {
    return projet.statut === 'EN_COURS' ? 50 : 100;
  }

  loadMore() {
    this.visibleProjects = this.projects;
  }
}
