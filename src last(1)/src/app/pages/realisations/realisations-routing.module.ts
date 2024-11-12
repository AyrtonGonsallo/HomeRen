import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealisationsDetailsComponent } from './realisations-details/realisations-details.component';
import { RealisationsListeComponent } from './realisations-liste/realisations-liste.component';

const routes: Routes = [
  {path:'',component:RealisationsListeComponent},
  { path: 'realisations-details/:id', component: RealisationsDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealisationsRoutingModule { }
