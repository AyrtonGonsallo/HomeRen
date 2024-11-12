import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-recap-depose-murs',
  templateUrl: './recap-depose-murs.component.html',
  styleUrl: './recap-depose-murs.component.css'
})
export class RecapDeposeMursComponent {
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  deposeMursForm:any
  gamme_id:any
  gamme:any
  gammes:any[]=[]
  constructor(private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.deposeMursForm=this.gestiondesdevisService.getFormulaireByName("depose-murs")
    console.log("recap: ",this.deposeMursForm);
    /* this.deposeMursForm.formulaire["gammes-produits-depose-murs"].murs.forEach((element: any) => {
      let gamme_id=element.gamme.split(":")[0] 
      this.userService.getGammeByID(gamme_id).subscribe(
      (response: any) => {
        console.log('recuperation de la gamme:', response);
        this.gammes.push(response)
      },
      (error: any) => {
        console.error('Erreur lors de la recuperation de la gamme:', error);
      }
    );
    }); */
   
  }
}
