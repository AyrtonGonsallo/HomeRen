import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PiecesRoutingModule } from './pieces-routing.module';
import { PiecesDetailsComponent } from './pieces-details/pieces-details.component';
import { PiecesListeComponent } from './pieces-liste/pieces-liste.component';

@NgModule({
  declarations: [
    PiecesDetailsComponent,
    PiecesListeComponent
  ],
  imports: [
    CommonModule,
    PiecesRoutingModule,
  ]
})
export class PiecesModule { }
