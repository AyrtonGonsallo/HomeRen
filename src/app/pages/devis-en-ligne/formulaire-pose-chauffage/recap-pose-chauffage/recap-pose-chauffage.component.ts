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
  form: any;
  constructor(
    private gestiondesdevisService: GestionDesDevisService,
    private userService: ApiConceptsEtTravauxService
  ) {
    this.form = this.gestiondesdevisService.getFormulaireByName("pose-chauffage").formulaire["gammes-produits-pose-chauffage"];
    console.log("chauffage ",this.form );
  }

  
}

