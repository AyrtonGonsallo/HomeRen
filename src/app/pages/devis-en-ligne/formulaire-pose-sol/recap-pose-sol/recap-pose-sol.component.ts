import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-recap-pose-sol',
  templateUrl: './recap-pose-sol.component.html',
  styleUrl: './recap-pose-sol.component.css'
})
export class RecapPoseSolComponent {
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  poseSolForm:any
  gamme_id:any
  gamme:any
  plinthe_id:any
  plinthe:any
  avec_des_plinthes:Boolean=true
  constructor(private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.poseSolForm=this.gestiondesdevisService.getFormulaireByName("pose-sol");
    console.log("recap: ",this.poseSolForm);
    
    
  }

  get_title(slug:string){
    return slug.split(":")[1];
  }
}