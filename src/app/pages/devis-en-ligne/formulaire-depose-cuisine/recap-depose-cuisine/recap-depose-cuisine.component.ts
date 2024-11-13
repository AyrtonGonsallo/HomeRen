import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-recap-depose-cuisine',
  templateUrl: './recap-depose-cuisine.component.html',
  styleUrl: './recap-depose-cuisine.component.css'
})
export class RecapDeposeCuisineComponent {
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  gammes: any;
  elements_hauts: any;
  elements_bas: any;
  has_haut=false
  has_bas=false
  constructor(
    private gestiondesdevisService: GestionDesDevisService,
    private userService: ApiConceptsEtTravauxService
  ) {
    this.gammes = this.gestiondesdevisService.getFormulaireByName("depose-elementcuisines").formulaire["gammes-produits-depose-elementcuisines"].gammes;
    console.log(this.gammes );
    this.elements_hauts = this.gestiondesdevisService.getFormulaireByName("depose-elementcuisines").formulaire["dimensions-depose-elementcuisines"].elementcuisines_haut;
    console.log(this.elements_hauts );
    this.elements_bas = this.gestiondesdevisService.getFormulaireByName("depose-elementcuisines").formulaire["dimensions-depose-elementcuisines"].elementcuisines_bas;
    console.log(this.elements_bas );
    this.has_bas = this.gestiondesdevisService.getFormulaireByName("depose-elementcuisines").formulaire["dimensions-depose-elementcuisines"].is_active_Ecb;
    this.has_haut = this.gestiondesdevisService.getFormulaireByName("depose-elementcuisines").formulaire["dimensions-depose-elementcuisines"].is_active_Ech;

  }

  
}
