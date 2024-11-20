import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-recap-pose-murs',
  templateUrl: './recap-pose-murs.component.html',
  styleUrl: './recap-pose-murs.component.css'
})
export class RecapPoseMursComponent {
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  poseMursForm:any
  gammes:any[]=[]
  constructor(private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.poseMursForm=this.gestiondesdevisService.getFormulaireByName("pose-murs")
    console.log("recap: ",this.poseMursForm);
    this.poseMursForm.formulaire["gammes-produits-pose-murs"].murs.forEach((element: any) => {
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
    });
   
  }

  get_title(slug:string){
    return slug.split(":")[1];
  }
}
