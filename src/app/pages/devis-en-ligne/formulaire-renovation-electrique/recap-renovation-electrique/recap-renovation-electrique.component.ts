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
  appareils: any;
  chauffage_exist:boolean=false
  form:any
  gamme:any
  constructor(
    private gestiondesdevisService: GestionDesDevisService,
    private userService: ApiConceptsEtTravauxService
  ) {
    this.form=this.gestiondesdevisService.getFormulaireByName("renovation-electrique").formulaire;
   this.gamme=this.form["gammes-produits-renovation-electrique"]
    this.appareils=this.form["gammes-produits-renovation-electrique"].appareils_electrique;
   this.chauffage_exist=this.form["gammes-produits-renovation-electrique"].chauffage_exist;
   
  }
  get_label(slug:boolean){
    return (slug)?'oui':'non';
  }
  get_title(slug:string){
    return slug.split(":")[1];
  }
}