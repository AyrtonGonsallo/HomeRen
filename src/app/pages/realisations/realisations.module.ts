import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealisationsRoutingModule } from './realisations-routing.module';
import { RealisationsListeComponent } from './realisations-liste/realisations-liste.component';
import { RealisationsDetailsComponent } from './realisations-details/realisations-details.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    RealisationsListeComponent,
    RealisationsDetailsComponent
  ],
  imports: [
    CommonModule,SharedModule,
    RealisationsRoutingModule
  ]
})
export class RealisationsModule { }
