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
  gammes_depose_form: any;
  constructor(
    private gestiondesdevisService: GestionDesDevisService,
  ) {
    this.appareils_a_ajouter = this.gestiondesdevisService.getFormulaireByName("pose-app-san").formulaire["gammes-produits-pose-app-san"].appareils_salle_de_bain;
    this.gammes_depose_form = this.gestiondesdevisService.getFormulaireByName("pose-app-san").formulaire["gammes-produits-pose-app-san"].gammes_depose_form;

    console.log("sanitaire ",this.appareils_a_ajouter );
    console.log("depose ",this.gammes_depose_form );
  }
  get_title(slug:string){
    return slug.split(":")[1];
  }
  get_label(slug: any): string {
    // Convert the value to a boolean if it is a string
    const booleanSlug = (slug === 'true' || slug === true) ? true : false;
  
    return booleanSlug ? 'oui' : 'non';
  }
}
