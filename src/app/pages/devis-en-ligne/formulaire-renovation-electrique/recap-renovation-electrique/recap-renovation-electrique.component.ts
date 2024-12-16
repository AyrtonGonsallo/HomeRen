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
  chauffage_exist:boolean=false
  mes:boolean=false
  rcn:boolean=false
  form:any
  gamme:any
  constructor(
    private gestiondesdevisService: GestionDesDevisService,
    private userService: ApiConceptsEtTravauxService
  ) {
    this.form=this.gestiondesdevisService.getFormulaireByName("renovation-electrique").formulaire;
   this.gamme=this.form["gammes-produits-renovation-electrique"]
   this.chauffage_exist=this.form["gammes-produits-renovation-electrique"].chauffage_exist;
   this.mes=this.form["gammes-produits-renovation-electrique"].mise_en_securite;
   this.rcn=this.form["gammes-produits-renovation-electrique"].renovation_conforme;
   
  }
  get_label(slug:boolean){
    return (slug)?'oui':'non';
  }
  get_title(slug:string){
    return slug.split(":")[1];
  }
}