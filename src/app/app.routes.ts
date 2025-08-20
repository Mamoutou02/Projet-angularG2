import { NewContribution } from './features/coponents-contributeurs/new-contribution/new-contribution';
import { Routes } from '@angular/router';

//import {IdeesDeProjets} from './features/components-administrateur/idees-de-projets/idees-de-projets';
import {DasboardAdmin} from './features/components-administrateur/dasboard-admin/dasboard-admin';
import {DashboardSection} from './features/components-administrateur/dashboard-section/dashboard-section';
import {Domaines} from './features/components-administrateur/domaines/domaines';
import {ParametrerLesBadges} from './features/components-administrateur/parametrer-les-badges/parametrer-les-badges';
import {ParametrerNotifications} from './features/components-administrateur/parametrer-notifications/parametrer-notifications';
import {IdeeDeProjet} from './features/components-administrateur/idee-de-projet/idee-de-projet';
import { Sidebar } from './features/coponents-contributeurs/sidebar/sidebar';
import { DashboardContributeur } from './features/coponents-contributeurs/dashboard-contributeur/dashboard-contributeur';
import { DasboardContributeurSection } from './features/coponents-contributeurs/dasboard-contributeur-section/dasboard-contributeur-section';
import { ListProjects } from './features/coponents-contributeurs/list-projects/list-projects';
import { Reconpenses } from './features/coponents-contributeurs/reconpenses/reconpenses';
import { PopupEye } from './features/coponents-contributeurs/list-projects/popup-eye/popup-eye';

import {
  MesProjetContributeurs
} from './features/coponents-contributeurs/mes-projet-contributeurs/mes-projet-contributeurs';
import {ConnexionComponent} from './features/login/connexion-component/connexion-component';
import {InscriptionComponent} from './features/login/inscription-component/inscription-component';
import { ContributionDetailsComponent } from './features/coponents-contributeurs/contribution-details/contribution-details';
import { IdeeDeProjetContributeursComponent } from './features/coponents-contributeurs/idee-de-projet-contributeurs/idee-de-projet-contributeurs';
import {PageAccueil} from './features/page-accueil/page-accueil';
import { DashboardGestionnaire } from './features/coponents-contributeurs/dashboard-gestionnaire/dashboard-gestionnaire';
import { EnsembleContributionsContributeurs } from './features/coponents-contributeurs/ensemble-contributions-contributeurs/ensemble-contributions-contributeurs';
import { DemandeGestionnaireAdministrateur } from './features/components-administrateur/demande-gestionnaire-administrateur/demande-gestionnaire-administrateur';
import { ProjetRecents } from './features/coponents-contributeurs/projet-recents/projet-recents';
import { MesContributionsContributeurs } from './features/coponents-contributeurs/mes-contributions-contributeurs/mes-contributions-contributeurs';
import { Projets } from './features/components-administrateur/projets/projets';


export const routes: Routes = [
  // Redirection par défaut vers Connexion
  // { path: '', redirectTo: 'Connexion', pathMatch: 'full' },

  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: PageAccueil },
  { path: 'Connexion', component: ConnexionComponent },


  { path: 'new-contribution', component: NewContribution },

  {
    path: "ideeProjet",
    component: IdeeDeProjet
  },

  {
    path: "Domaines",
    component: DasboardAdmin,
    children:[
      { path: "", component: Domaines }
    ]
  },

  { path: 'contribution-details', component: ContributionDetailsComponent },

  {
    path: "ParametrerBadge",
    component: DasboardAdmin,
    children: [
      { path: "", component: ParametrerLesBadges }
    ]
  },
  {
    path: "Projet",
    component: DasboardAdmin,
    children:[
      { path: "", component: Projets }
    ]
  },
  {
    path: "ParemtrerNotication",
    component: DasboardAdmin,
    children:[
      { path: "", component: ParametrerNotifications }
    ]
  },
  {
    path: "AdminDashboard",
    component: DasboardAdmin,
    children: [
      { path: "", component: DashboardSection }
    ]
  },
  {
    path: "dashboardContributeur",
    component: DashboardContributeur,
    children: [
      { path: "", component: DasboardContributeurSection }
    ]
  },
  {
    path: "NewContribution",
    component: DashboardContributeur,
    children: [
      { path: "", component: NewContribution }
    ]
  },
  {
  path: "MescontributionsContributeurs",
  component: MesContributionsContributeurs
},
  {
    path: "TableauContributeur",
    component: DashboardContributeur,
    children: [
      { path: "", component: DasboardContributeurSection }
    ]
  },
  {
    path: "ideeProjetContributeur",
    component: DashboardContributeur,
    children: [
      { path: "", component: IdeeDeProjetContributeursComponent }
    ]
  },
  {
    path: "ProjetsContributeurs",
    component: DashboardContributeur,
    children:[
      { path:'', component: MesProjetContributeurs }
    ]
  },
  {
    path: "dashboardGestionnaire",
    component: DashboardContributeur,
    children: [
      { path: "", component: DashboardGestionnaire }
    ]
  },
   {
    path: "Deconnexion",
    component: ConnexionComponent
  },
  {
    path: "Ensemble",
    component: DashboardContributeur,
    children:[
      { path: '', component: EnsembleContributionsContributeurs }
    ]
  },
  {
    path: "ProjetsRejoints",
    component: DashboardContributeur,
    children: [
      { path: '', component: ProjetRecents }
    ]
  },
  {
    path: "Demandes-Gestionnaires",
    component: DasboardAdmin,
    children:[
      { path: '', component: DemandeGestionnaireAdministrateur }
    ]
  },
  {
    path: "Recompenses",
    component: DashboardContributeur,
    children:[
      { path:'', component: Reconpenses }
    ]
  },
  { path: "projects", component: ListProjects },
  { path:"Connexion", component: ConnexionComponent },
  { path:"Inscription", component: InscriptionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

