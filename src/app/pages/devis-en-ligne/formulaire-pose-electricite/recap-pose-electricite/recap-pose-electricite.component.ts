import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-recap-pose-electricite',
  templateUrl: './recap-pose-electricite.component.html',
  styleUrl: './recap-pose-electricite.component.css'
})
export class RecapPoseElectriciteComponent {
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  appareils: any;
  constructor(
    private gestiondesdevisService: GestionDesDevisService,
    private userService: ApiConceptsEtTravauxService
  ) {
    this.appareils = this.gestiondesdevisService.getFormulaireByName("pose-electricite").formulaire["gammes-produits-pose-electricite"].appareils_electrique;
    console.log("electricite ",this.appareils );
  }

}
