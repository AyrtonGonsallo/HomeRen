import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-recap-demolition-cloisons',
  templateUrl: './recap-demolition-cloisons.component.html',
  styleUrl: './recap-demolition-cloisons.component.css'
})
export class RecapDemolitionCloisonsComponent {
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  gammes_cloison: any;
  gammes_materiaux: any;
  dimensions_ouverture: any;
  dimensions_murs_non_porteurs: any;
  quantite_portes_simples_creuse: any;
  quantite_portes_doubles_creuses: any;
  quantite_porte_simple_plein: any;
  quantite_porte_double_pleine: any;
  ouverture_choisie=false
  portes_choisies=false
  demolition_murs_choisie=false
  form:any
  constructor(
    private gestiondesdevisService: GestionDesDevisService,
    private userService: ApiConceptsEtTravauxService
  ) {
    this.form=this.gestiondesdevisService.getFormulaireByName("murs-non-porteurs").formulaire;
    console.log("recap demol: ",this.form)
    this.dimensions_murs_non_porteurs=this.form["dimensions-murs-non-porteurs"]["mursNonporteurs"];
    this.quantite_portes_simples_creuse=this.form["dimensions-murs-non-porteurs"]["quantite_portes_simples_creuse"];
    this.quantite_portes_doubles_creuses=this.form["dimensions-murs-non-porteurs"]["quantite_portes_doubles_creuses"];
    this.quantite_porte_simple_plein=this.form["dimensions-murs-non-porteurs"]["quantite_porte_simple_plein"];
    this.quantite_porte_double_pleine=this.form["dimensions-murs-non-porteurs"]["quantite_porte_double_pleine"];
    this.dimensions_ouverture=this.form["dimensions-murs-non-porteurs"]["ouverturePartielle"];
    this.gammes_cloison=this.form["gammes-produits-murs-non-porteurs"]["mursnonporteurs"];
    this.gammes_materiaux=this.form["gammes-produits-murs-non-porteurs"]["mursnonporteurs"];
   this.ouverture_choisie=this.form["gammes-produits-murs-non-porteurs"]["ouverturepartielles_choisis"];
   this.demolition_murs_choisie=this.form["gammes-produits-murs-non-porteurs"]["mursnonporteurs_choisis"];
   this.portes_choisies=this.form["gammes-produits-murs-non-porteurs"]["portes_choisis"];
    /* this.gammes = this.gestiondesdevisService.getFormulaireByName("murs-non-porteurs").formulaire["gammes-produits-murs-non-porteurs"].gammes;
    console.log(this.gammes );
    this.elements_hauts = this.gestiondesdevisService.getFormulaireByName("murs-non-porteurs").formulaire["dimensions-murs-non-porteurs"].elementcuisines_haut;
    console.log(this.elements_hauts );
    this.elements_bas = this.gestiondesdevisService.getFormulaireByName("murs-non-porteurs").formulaire["dimensions-murs-non-porteurs"].elementcuisines_bas;
    console.log(this.elements_bas ); */
  }

  get_title(slug:string){
    return slug.split(":")[1];
  }
}
