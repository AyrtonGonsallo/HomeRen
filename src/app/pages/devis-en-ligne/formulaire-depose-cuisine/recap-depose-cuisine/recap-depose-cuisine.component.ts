import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';


@Component({
  selector: 'app-recap-depose-cuisine',
  templateUrl: './recap-depose-cuisine.component.html',
  styleUrl: './recap-depose-cuisine.component.css'
})
export class RecapDeposeCuisineComponent {
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  appareils_a_ajouter: any;
  gammes_depose_form: any;
  constructor(
    private gestiondesdevisService: GestionDesDevisService,
  ) {
    this.appareils_a_ajouter = this.gestiondesdevisService.getFormulaireByName("pose-elementcuisines").formulaire["gammes-produits-pose-elementcuisines"].appareils_cuisine;
    this.gammes_depose_form = this.gestiondesdevisService.getFormulaireByName("pose-elementcuisines").formulaire["dimensions-pose-elementcuisines"].gammes_depose_form;

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
