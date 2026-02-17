import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { EspaceMembreRoutingModule } from './espace-membre-routing.module';
import { EspaceMembreComponent } from './espace-membre.component';
import { DevisListeToVisitComponent } from './devis-liste-to-visit/devis-liste-to-visit.component';
import { CurrentProjectsComponent } from './current-projects/current-projects.component';
import { EndProjectsComponent } from './end-projects/end-projects.component';
import { ProjetDetailsComponent } from './projet-details/projet-details.component';
import { PaiementsComponent } from './paiements/paiements.component';


@NgModule({
  declarations: [
    EspaceMembreComponent,
    DevisListeToVisitComponent,
    CurrentProjectsComponent,
    EndProjectsComponent,
    ProjetDetailsComponent,
    PaiementsComponent
  ],
  imports: [
    CommonModule,SharedModule,
    EspaceMembreRoutingModule
  ]
})
export class EspaceMembreModule { }
