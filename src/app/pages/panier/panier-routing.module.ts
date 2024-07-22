import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeDesDevisComponent } from './liste-des-devis/liste-des-devis.component';

const routes: Routes = [
  {path:'',component:ListeDesDevisComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanierRoutingModule { }
