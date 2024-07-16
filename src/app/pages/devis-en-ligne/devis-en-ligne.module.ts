import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DevisEnLigneRoutingModule } from './devis-en-ligne-routing.module';
import { IndexComponent } from './index/index.component';
import { IconModule } from '@ant-design/icons-angular';
import { FormulairePoseSolComponent } from './formulaire-pose-sol/formulaire-pose-sol.component';
import { FormulairePosePorteComponent } from './formulaire-pose-porte/formulaire-pose-porte.component';
import { FormulairePosePlomberieComponent } from './formulaire-pose-plomberie/formulaire-pose-plomberie.component';
import { FormulairePoseChauffageComponent } from './formulaire-pose-chauffage/formulaire-pose-chauffage.component';
import { FormulairePoseElectriciteComponent } from './formulaire-pose-electricite/formulaire-pose-electricite.component';
import { DimensionsComponent } from './formulaire-pose-murs/dimensions/dimensions.component';
import { EtatSurfacesComponent } from './formulaire-pose-murs/etat-surfaces/etat-surfaces.component';
import { GammesProduitsComponent } from './formulaire-pose-murs/gammes-produits/gammes-produits.component';
import { DimensionsPosePlafondComponent } from './formulaire-pose-plafond/dimensions/dimensions.component';
import { EtatSurfacesPosePlafondComponent } from './formulaire-pose-plafond/etat-surfaces/etat-surfaces.component';
import { GammesProduitsPosePlafondComponent } from './formulaire-pose-plafond/gammes-produits/gammes-produits.component';
import { PoseSolDimensionsComponent } from './formulaire-pose-sol/dimensions/dimensions.component';
import { PoseSolEtatSurfacesComponent } from './formulaire-pose-sol/etat-surfaces/etat-surfaces.component';
import { PoseSolGammesProduitsComponent } from './formulaire-pose-sol/gammes-produits/gammes-produits.component';
import { MursNonPorteursDimensionsComponent } from './formulaire-creation-murs-non-porteurs/dimensions/dimensions.component';
import { MursNonPorteursEtatSurfacesComponent } from './formulaire-creation-murs-non-porteurs/etat-surfaces/etat-surfaces.component';
import { MursNonPorteursGammesProduitsComponent } from './formulaire-creation-murs-non-porteurs/gammes-produits/gammes-produits.component';
import { PoseChauffageDimensionsComponent } from './formulaire-pose-chauffage/dimensions/dimensions.component';
import { PoseChauffageEtatSurfacesComponent } from './formulaire-pose-chauffage/etat-surfaces/etat-surfaces.component';
import { PoseChauffageGammesProduitsComponent } from './formulaire-pose-chauffage/gammes-produits/gammes-produits.component';
import { PoseElectriciteDimensionsComponent } from './formulaire-pose-electricite/dimensions/dimensions.component';
import { PoseElectriciteEtatSurfacesComponent } from './formulaire-pose-electricite/etat-surfaces/etat-surfaces.component';
import { PoseElectriciteGammesProduitsComponent } from './formulaire-pose-electricite/gammes-produits/gammes-produits.component';
import { PosePorteDimensionsComponent } from './formulaire-pose-porte/dimensions/dimensions.component';
import { PosePorteEtatSurfacesComponent } from './formulaire-pose-porte/etat-surfaces/etat-surfaces.component';
import { PosePorteGammesProduitsComponent } from './formulaire-pose-porte/gammes-produits/gammes-produits.component';
import { PosePlomberieDimensionsComponent } from './formulaire-pose-plomberie/dimensions/dimensions.component';
import { PosePlomberieEtatSurfacesComponent } from './formulaire-pose-plomberie/etat-surfaces/etat-surfaces.component';
import { PosePlomberieGammesProduitsComponent } from './formulaire-pose-plomberie/gammes-produits/gammes-produits.component';

@NgModule({
  declarations: [
    IndexComponent,
    FormulairePoseSolComponent,
    FormulairePosePorteComponent,
    FormulairePosePlomberieComponent,
    FormulairePoseChauffageComponent,
    FormulairePoseElectriciteComponent,
    MursNonPorteursGammesProduitsComponent,
    MursNonPorteursEtatSurfacesComponent,
    MursNonPorteursDimensionsComponent,
    DimensionsComponent,
    PoseChauffageDimensionsComponent,
    PoseChauffageEtatSurfacesComponent,
    PoseChauffageGammesProduitsComponent,
    EtatSurfacesComponent,
    GammesProduitsComponent,
    DimensionsPosePlafondComponent,
    EtatSurfacesPosePlafondComponent,
    GammesProduitsPosePlafondComponent,
    PoseSolDimensionsComponent,
    PoseSolEtatSurfacesComponent,
    PoseSolGammesProduitsComponent,
    PoseElectriciteDimensionsComponent,
    PoseElectriciteEtatSurfacesComponent,
    PoseElectriciteGammesProduitsComponent,
    PosePorteDimensionsComponent,
    PosePorteEtatSurfacesComponent,
    PosePorteGammesProduitsComponent,
    PosePlomberieDimensionsComponent,
    PosePlomberieEtatSurfacesComponent,
    PosePlomberieGammesProduitsComponent
  ],
  imports: [
    CommonModule,SharedModule,
    DevisEnLigneRoutingModule,IconModule,
  ]
})
export class DevisEnLigneModule { }
