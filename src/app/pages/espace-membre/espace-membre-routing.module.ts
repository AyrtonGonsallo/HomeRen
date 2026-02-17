import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspaceMembreComponent } from './espace-membre.component';
import { CurrentProjectsComponent } from './current-projects/current-projects.component';
import { EndProjectsComponent } from './end-projects/end-projects.component';
import { DevisListeToVisitComponent } from './devis-liste-to-visit/devis-liste-to-visit.component';
import { ProjetDetailsComponent } from './projet-details/projet-details.component';
import { PaiementsComponent } from './paiements/paiements.component';

const routes: Routes = [
  { path: 'projets-en-cours', component: CurrentProjectsComponent },
  { path: 'projets-finis', component: EndProjectsComponent },
  { path: 'visites-technicien', component: DevisListeToVisitComponent },
  { path: 'paiements', component: PaiementsComponent },
  {path:'projet/:id',component:ProjetDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceMembreRoutingModule { }
