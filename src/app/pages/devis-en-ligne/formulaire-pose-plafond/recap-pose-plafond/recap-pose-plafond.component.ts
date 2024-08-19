import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-recap-pose-plafond',
  templateUrl: './recap-pose-plafond.component.html',
  styleUrl: './recap-pose-plafond.component.css'
})
export class RecapPosePlafondComponent {
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  posePlafondForm:any
  gamme_id:any
  gamme:any
  constructor(private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.posePlafondForm=this.gestiondesdevisService.getFormulaireByName("pose-plafond");
  
    console.log("recap: ",this.posePlafondForm);
    this.gamme_id=this.posePlafondForm.formulaire["gammes-produits-pose-plafond"].gamme.split(":")[0]
    this.userService.getGammeByID(this.gamme_id).subscribe(
      (response: any) => {
        console.log('recuperation de la gamme:', response);
        this.gamme=response
      },
      (error: any) => {
        console.error('Erreur lors de la recuperation de la gamme:', error);
      }
    );
  }
}
