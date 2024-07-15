import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DevisEnLigneRoutingModule } from './devis-en-ligne-routing.module';
import { IndexComponent } from './index/index.component';
import { IconModule } from '@ant-design/icons-angular';
import { FormulairePoseSolComponent } from './formulaire-pose-sol/formulaire-pose-sol.component';
import { FormulairePosePlafondComponent } from './formulaire-pose-plafond/formulaire-pose-plafond.component';
import { FormulairePosePorteComponent } from './formulaire-pose-porte/formulaire-pose-porte.component';
import { FormulairePosePlomberieComponent } from './formulaire-pose-plomberie/formulaire-pose-plomberie.component';
import { FormulairePoseChauffageComponent } from './formulaire-pose-chauffage/formulaire-pose-chauffage.component';
import { FormulairePoseElectriciteComponent } from './formulaire-pose-electricite/formulaire-pose-electricite.component';
import { FormulaireCreationMursNonPorteursComponent } from './formulaire-creation-murs-non-porteurs/formulaire-creation-murs-non-porteurs.component';
import { DimensionsComponent } from './formulaire-pose-murs/dimensions/dimensions.component';
import { EtatSurfacesComponent } from './formulaire-pose-murs/etat-surfaces/etat-surfaces.component';
import { GammesProduitsComponent } from './formulaire-pose-murs/gammes-produits/gammes-produits.component';
import { DimensionsPosePlafondComponent } from './formulaire-pose-plafond/dimensions/dimensions.component';
import { EtatSurfacesPosePlafondComponent } from './formulaire-pose-plafond/etat-surfaces/etat-surfaces.component';
import { GammesProduitsPosePlafondComponent } from './formulaire-pose-plafond/gammes-produits/gammes-produits.component';



@NgModule({
  declarations: [
    IndexComponent,
    FormulairePoseSolComponent,
    FormulairePosePlafondComponent,
    FormulairePosePorteComponent,
    FormulairePosePlomberieComponent,
    FormulairePoseChauffageComponent,
    FormulairePoseElectriciteComponent,
    FormulaireCreationMursNonPorteursComponent,
    DimensionsComponent,
    EtatSurfacesComponent,
    GammesProduitsComponent,
    DimensionsPosePlafondComponent,
    EtatSurfacesPosePlafondComponent,
    GammesProduitsPosePlafondComponent
  ],
  imports: [
    CommonModule,SharedModule,
    DevisEnLigneRoutingModule,IconModule,
  ]
})
export class DevisEnLigneModule { }
