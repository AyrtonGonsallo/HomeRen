import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PanierRoutingModule } from './panier-routing.module';
import { ListeDesDevisComponent } from './liste-des-devis/liste-des-devis.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ListeDesDevisComponent
  ],
  imports: [
    CommonModule,SharedModule,FontAwesomeModule,
    PanierRoutingModule
  ]
})
export class PanierModule { }
