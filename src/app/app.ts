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
import {PageAccueil} from './features/page-accueil/page-accueil';
import { EnsembleContributionsContributeurs } from './features/coponents-contributeurs/ensemble-contributions-contributeurs/ensemble-contributions-contributeurs';
import { ProjetRecents } from './features/coponents-contributeurs/projet-recents/projet-recents';
import { MesContributionsContributeurs } from './features/coponents-contributeurs/mes-contributions-contributeurs/mes-contributions-contributeurs';
import { NewContribution } from './features/coponents-contributeurs/new-contribution/new-contribution';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DasboardAdmin, RouterLink, 
    Sidebar, SidebarContributeurs, MesProjetContributeurs,
     ConnexionComponent, InscriptionComponent, PageAccueil,
     EnsembleContributionsContributeurs, ProjetRecents,
    MesProjetContributeurs, MesContributionsContributeurs, NewContribution],
  templateUrl: './app.html',
  standalone: true,
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('CollabdevFontend');
}
