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
  types1:any[]=[]
  types2:any[]=[]
  types3:any[]=[]
  types4:any[]=[]
  creation_ou_remplacement:any[]=[]
  infos_c_types:any[]=[]
  infos_c_finition:any[]=[]
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece

  constructor(private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.forms_portes=this.gestiondesdevisService.getFormulaireByName("pose-portes");
    let portes_data=this.forms_portes.formulaire['gammes-produits-pose-portes'].portes
    console.log("recap: ",this.forms_portes);
    for(let i=0;i<portes_data.length;i++){
      this.types1.push(portes_data[i].type);
      this.types2.push(portes_data[i].type2);
      this.types3.push(portes_data[i].type3);
      this.types4.push(portes_data[i].finition);
      this.infos_c_types.push(portes_data[i].infos_comp_type);
      this.infos_c_finition.push(portes_data[i].infos_comp_finition);
      this.creation_ou_remplacement.push(portes_data[i].creation_ou_remplacement);
      
      
    }
   

  }

  get_title(slug:string){
    return slug.split(":")[2];
  }
}
