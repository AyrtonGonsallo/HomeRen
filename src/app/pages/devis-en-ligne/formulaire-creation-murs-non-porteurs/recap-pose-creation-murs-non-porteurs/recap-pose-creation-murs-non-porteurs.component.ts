import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-recap-creation-murs-non-porteurs',
  templateUrl: './recap-pose-creation-murs-non-porteurs.component.html',
  styleUrl: './recap-pose-creation-murs-non-porteurs.component.css'
})
export class RecapPoseCreationMursNonPorteursComponent {
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  cmnpForm:any
  
  constructor(private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.cmnpForm=this.gestiondesdevisService.getFormulaireByName("creation-murs-non-porteurs")
    console.log("recap creation murs non porteurs : ",this.cmnpForm);
    
    
   
  }

  get_epaisseur(dim:number){
    if(dim==0){
      return "supérieur à 10"
    }else{
      return dim+" cm"
    }
  }

  get_title(slug:string){
    return slug.split(":")[2];
  }
}