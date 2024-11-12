import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';

@Component({
  selector: 'app-recap-pose-app-san',
  templateUrl: './recap-pose-app-san.component.html',
  styleUrl: './recap-pose-app-san.component.css'
})
export class RecapPoseAppSanComponent {
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  appareils_a_ajouter: any;
  constructor(
    private gestiondesdevisService: GestionDesDevisService,
  ) {
    this.appareils_a_ajouter = this.gestiondesdevisService.getFormulaireByName("pose-app-san").formulaire["gammes-produits-pose-app-san"].appareils_salle_de_bain;
   console.log("sanitaire ",this.appareils_a_ajouter );
  }
  get_title(slug:string){
    return slug.split(":")[1];
  }
}