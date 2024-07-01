import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PiecesDetailsComponent } from './pieces-details/pieces-details.component';
import { PiecesListeComponent } from './pieces-liste/pieces-liste.component';

const routes: Routes = [
  { path: 'pieces-liste', component: PiecesListeComponent},
  { path: 'pieces-details/:id', component: PiecesDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PiecesRoutingModule { }
