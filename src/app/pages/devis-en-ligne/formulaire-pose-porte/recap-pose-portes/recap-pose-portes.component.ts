import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-recap-pose-portes',
  templateUrl: './recap-pose-portes.component.html',
  styleUrl: './recap-pose-portes.component.css'
})
export class RecapPosePortesComponent {
  forms_portes:any
  types_portes:any[]=[]
  natures_portes:any[]=[]

  gammes:any[]=[]

  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece

  constructor(private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.forms_portes=this.gestiondesdevisService.getFormulaireByName("pose-portes");
    let portes_data=this.forms_portes.formulaire['gammes-produits-pose-portes'].portes
    console.log("recap: ",this.forms_portes);
    for(let i=0;i<portes_data.length;i++){
      this.types_portes.push(portes_data[i].type_porte);
      this.natures_portes.push(portes_data[i].nature_porte);
    
      this.gammes.push(portes_data[i].gamme);
     
      
      
    }
   

  }

  get_title(slug:string){
    return slug.split(":")[2];
  }
}
