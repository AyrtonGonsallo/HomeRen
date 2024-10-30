import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-recap-pose-electricite',
  templateUrl: './recap-pose-electricite.component.html',
  styleUrl: './recap-pose-electricite.component.css'
})
export class RecapPoseElectriciteComponent {
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  qte_prises: number=0;
  qte_eclairage_profond: number=0;
  qte_eclairage_applique: number=0;
  qte_convecteur_electrique: number=0;
  appareils_a_ajouter: any;
  passage_fils_electrique:boolean=false
  constructor(
    private gestiondesdevisService: GestionDesDevisService,
  ) {
    this.appareils_a_ajouter = this.gestiondesdevisService.getFormulaireByName("pose-electricite").formulaire["gammes-produits-pose-electricite"].appareils_electrique;
    this.qte_prises = this.gestiondesdevisService.getFormulaireByName("pose-electricite").formulaire["gammes-produits-pose-electricite"].qte_prises;
    this.qte_eclairage_profond = this.gestiondesdevisService.getFormulaireByName("pose-electricite").formulaire["gammes-produits-pose-electricite"].qte_eclairage_profond;
    this.qte_eclairage_applique = this.gestiondesdevisService.getFormulaireByName("pose-electricite").formulaire["gammes-produits-pose-electricite"].qte_eclairage_applique;
    this.qte_convecteur_electrique = this.gestiondesdevisService.getFormulaireByName("pose-electricite").formulaire["gammes-produits-pose-electricite"].qte_convecteur_electrique;
    this.passage_fils_electrique=this.gestiondesdevisService.getFormulaireByName("pose-electricite").formulaire["gammes-produits-pose-electricite"].passage_fils_electique;
    console.log("electricite ",this.appareils_a_ajouter );
  }
  get_title(slug:string){
    return slug.split(":")[1];
  }
}
