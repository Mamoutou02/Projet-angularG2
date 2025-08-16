import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {DasboardAdmin} from './features/components-administrateur/dasboard-admin/dasboard-admin';
import {SidebarContributeurs} from './features/coponents-contributeurs/sidebar-contributeurs/sidebar-contributeurs';
import {Sidebar} from './features/components-administrateur/sidebar/sidebar';
import {
  MesProjetContributeurs
} from './features/coponents-contributeurs/mes-projet-contributeurs/mes-projet-contributeurs';
import {ConnexionComponent} from './features/login/connexion-component/connexion-component';
import {InscriptionComponent} from './features/login/inscription-component/inscription-component';
<<<<<<< HEAD
import {PageAccueil} from './features/page-accueil/page-accueil';
=======
import {
  EnsembleContributionsContributeurs
} from './features/coponents-contributeurs/ensemble-contributions-contributeurs/ensemble-contributions-contributeurs';
>>>>>>> IdeeProjet


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DasboardAdmin, RouterLink, Sidebar, SidebarContributeurs, MesProjetContributeurs, ConnexionComponent, InscriptionComponent, PageAccueil],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CollabdevFontend');
}
