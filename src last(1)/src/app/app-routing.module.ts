import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'',loadChildren:()=>import('./pages/accueil/accueil.module').then(m=>m.AccueilModule)},
    {path:'form-artisan',loadChildren:()=>import('./pages/form-artisan/form-artisan.module').then(m=>m.FormArtisanModule)},
    {path:'form-particulier',loadChildren:()=>import('./pages/form-particulier/form-particulier.module').then(m=>m.FormParticulierModule)},
    {path:'realisations',loadChildren:()=>import('./pages/realisations/realisations.module').then(m=>m.RealisationsModule)},
    {path:'pieces',loadChildren:()=>import('./pages/pieces/pieces.module').then(m=>m.PiecesModule)},
    {path:'mentions-legales',loadChildren:()=>import('./pages/mentions-legales/mentions-legales.module').then(m=>m.MentionsLegalesModule)},
    {path:'contact',loadChildren:()=>import('./pages/contact/contact.module').then(m=>m.ContactModule)},
    {path:'devis-en-ligne',loadChildren:()=>import('./pages/devis-en-ligne/devis-en-ligne.module').then(m=>m.DevisEnLigneModule)},
    {path:'qui-somme-nous',loadChildren:()=>import('./pages/qui-somme-nous/qui-somme-nous.module').then(m=>m.QuiSommeNousModule)},
    {path:'faq',loadChildren:()=>import('./pages/faq/faq.module').then(m=>m.FaqModule)},
    {path:'panier',loadChildren:()=>import('./pages/panier/panier.module').then(m=>m.PanierModule)},
    {path:'connexion',loadChildren:()=>import('./pages/connexion/connexion.module').then(m=>m.ConnexioModule)},

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
