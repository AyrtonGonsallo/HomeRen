import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-recap-renovation-electrique',
  templateUrl: './recap-renovation-electrique.component.html',
  styleUrl: './recap-renovation-electrique.component.css'
})
export class RecapRenovationElectriqueComponent {
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  data: any;
  form:any
  constructor(
    private gestiondesdevisService: GestionDesDevisService,
    private userService: ApiConceptsEtTravauxService
  ) {
    this.form=this.gestiondesdevisService.getFormulaireByName("renovation-electrique").formulaire;
   
    this.data=this.form["gammes-produits-renovation-electrique"];
   
   
  }

  get_title(slug:string){
    return slug.split(":")[1];
  }
}