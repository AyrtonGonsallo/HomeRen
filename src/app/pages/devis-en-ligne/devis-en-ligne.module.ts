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
import { RecapPosePortesComponent } from './formulaire-pose-porte/recap-pose-portes/recap-pose-portes.component';
import { PosePlomberieDimensionsComponent } from './formulaire-pose-plomberie/dimensions/dimensions.component';
import { PosePlomberieEtatSurfacesComponent } from './formulaire-pose-plomberie/etat-surfaces/etat-surfaces.component';
import { PosePlomberieGammesProduitsComponent } from './formulaire-pose-plomberie/gammes-produits/gammes-produits.component';
import { DeposeMursDimensionsComponent } from './formulaire-depose-murs/dimensions/dimensions.component';
import { DeposeMursEtatSurfacesComponent } from './formulaire-depose-murs/etat-surfaces/etat-surfaces.component';
import { DeposeMursGammesProduitsComponent } from './formulaire-depose-murs/gammes-produits/gammes-produits.component';
import { RecapPosePlafondComponent } from './formulaire-pose-plafond/recap-pose-plafond/recap-pose-plafond.component';
import { RecapPoseMursComponent } from './formulaire-pose-murs/recap-pose-murs/recap-pose-murs.component';
import { RecapPoseSolComponent } from './formulaire-pose-sol/recap-pose-sol/recap-pose-sol.component';
import { RecapPoseCreationMursNonPorteursComponent } from './formulaire-creation-murs-non-porteurs/recap-pose-creation-murs-non-porteurs/recap-pose-creation-murs-non-porteurs.component';
import { RecapDeposeMursComponent } from './formulaire-depose-murs/recap-depose-murs/recap-depose-murs.component';
import { RecapPosePlomberieComponent } from './formulaire-pose-plomberie/recap-pose-plomberie/recap-pose-plomberie.component';
import { DimensionsDeposeCuisineComponent } from './formulaire-depose-cuisine/dimensions-depose-cuisine/dimensions-depose-cuisine.component';
import { EtatSurfacesDeposeCuisineComponent } from './formulaire-depose-cuisine/etat-surfaces-depose-cuisine/etat-surfaces-depose-cuisine.component';
import { GammesProduitsDeposeCuisineComponent } from './formulaire-depose-cuisine/gammes-produits-depose-cuisine/gammes-produits-depose-cuisine.component';
import { RecapDeposeCuisineComponent } from './formulaire-depose-cuisine/recap-depose-cuisine/recap-depose-cuisine.component';
import { RecapDemolitionCloisonsComponent } from './formulaire-demolition-cloisons/recap-demolition-cloisons/recap-demolition-cloisons.component';
import { DimensionsDemolitionCloisonsComponent } from './formulaire-demolition-cloisons/dimensions-demolition-cloisons/dimensions-demolition-cloisons.component';
import { EtatSurfacesDemolitionCloisonsComponent } from './formulaire-demolition-cloisons/etat-surfaces-demolition-cloisons/etat-surfaces-demolition-cloisons.component';
import { GammesProduitsDemolitionCloisonsComponent } from './formulaire-demolition-cloisons/gammes-produits-demolition-cloisons/gammes-produits-demolition-cloisons.component';
import { RecapPoseChauffageComponent } from './formulaire-pose-chauffage/recap-pose-chauffage/recap-pose-chauffage.component';
import { RecapPoseElectriciteComponent } from './formulaire-pose-electricite/recap-pose-electricite/recap-pose-electricite.component';
import { RecapRenovationElectriqueComponent } from './formulaire-renovation-electrique/recap-renovation-electrique/recap-renovation-electrique.component';
import { GammesProduitsRenovationElectriqueComponent } from './formulaire-renovation-electrique/gammes-produits-renovation-electrique/gammes-produits-renovation-electrique.component';
import { EtatSurfacesRenovationElectriqueComponent } from './formulaire-renovation-electrique/etat-surfaces-renovation-electrique/etat-surfaces-renovation-electrique.component';
import { DimensionsRenovationElectriqueComponent } from './formulaire-renovation-electrique/dimensions-renovation-electrique/dimensions-renovation-electrique.component';
import { DimensionsPoseAppSanComponent } from './formulaire-pose-app-sanitaires/dimensions-pose-app-san/dimensions-pose-app-san.component';
import { EtatsSurfacesPoseAppSanComponent } from './formulaire-pose-app-sanitaires/etats-surfaces-pose-app-san/etats-surfaces-pose-app-san.component';
import { GammesProduitsPoseAppSanComponent } from './formulaire-pose-app-sanitaires/gammes-produits-pose-app-san/gammes-produits-pose-app-san.component';
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
    PosePlomberieGammesProduitsComponent,
    DeposeMursDimensionsComponent,
    DeposeMursEtatSurfacesComponent,
    DeposeMursGammesProduitsComponent,
    RecapPosePlafondComponent,
    RecapPoseMursComponent,
    RecapPoseSolComponent,
    RecapPoseCreationMursNonPorteursComponent,
    RecapDeposeMursComponent,
    RecapPosePlomberieComponent,
    DimensionsDeposeCuisineComponent,
    EtatSurfacesDeposeCuisineComponent,
    GammesProduitsDeposeCuisineComponent,
    RecapDeposeCuisineComponent,
    RecapDemolitionCloisonsComponent,
    DimensionsDemolitionCloisonsComponent,
    EtatSurfacesDemolitionCloisonsComponent,
    GammesProduitsDemolitionCloisonsComponent,
    RecapPosePortesComponent,
    RecapPoseChauffageComponent,
    RecapPoseElectriciteComponent,
    RecapRenovationElectriqueComponent,
    GammesProduitsRenovationElectriqueComponent,
    EtatSurfacesRenovationElectriqueComponent,
    DimensionsRenovationElectriqueComponent,
    DimensionsPoseAppSanComponent,
    EtatsSurfacesPoseAppSanComponent,
    GammesProduitsPoseAppSanComponent,
  ],
  imports: [
    CommonModule,SharedModule,
    DevisEnLigneRoutingModule,IconModule,
  ]
})
export class DevisEnLigneModule { }
