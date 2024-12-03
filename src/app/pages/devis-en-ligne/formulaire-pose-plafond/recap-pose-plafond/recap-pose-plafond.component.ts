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

  constructor(private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.posePlafondForm=this.gestiondesdevisService.getFormulaireByName("pose-plafond");
  
    console.log("recap: ",this.posePlafondForm);
    
  }
  get_title(slug:string){
    return slug.split(":")[1];
  }
}
