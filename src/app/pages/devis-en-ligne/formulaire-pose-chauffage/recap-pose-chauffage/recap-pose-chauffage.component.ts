import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-recap-pose-chauffage',
  templateUrl: './recap-pose-chauffage.component.html',
  styleUrl: './recap-pose-chauffage.component.css'
})
export class RecapPoseChauffageComponent {
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  form_gammes: any;
  form_dim: any;
  form_surfaces: any;
  constructor(
    private gestiondesdevisService: GestionDesDevisService,
    private userService: ApiConceptsEtTravauxService
  ) {
    this.form_dim = this.gestiondesdevisService.getFormulaireByName("pose-chauffage").formulaire["dimensions-pose-chauffage"];
    this.form_surfaces = this.gestiondesdevisService.getFormulaireByName("pose-chauffage").formulaire["etat-surfaces-pose-chauffage"];
    this.form_gammes = this.gestiondesdevisService.getFormulaireByName("pose-chauffage").formulaire["gammes-produits-pose-chauffage"];

    console.log("chauffage ",this.form_gammes );
  }
  get_title(slug:string){
    return slug.split(":")[2];
  }
  
  
}

