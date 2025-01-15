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
  constructor(private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.poseMursForm=this.gestiondesdevisService.getFormulaireByName("pose-murs")
    console.log("recap: ",this.poseMursForm);
  
   
  }

  get_title(slug:string){
    return slug.split(":")[1];
  }
}
