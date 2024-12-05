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
  appareils_a_remplacer: any;
  appareils_a_ajouter: any;
  disjoncteur_a_remplacer:boolean=false
  constructor(
    private gestiondesdevisService: GestionDesDevisService,
  ) {
    console.log(this.gestiondesdevisService.getFormulaireByName("pose-electricite"))
    this.appareils_a_ajouter = this.gestiondesdevisService.getFormulaireByName("pose-electricite").formulaire["gammes-produits-pose-electricite"].appareils_electrique;

    this.appareils_a_remplacer = this.gestiondesdevisService.getFormulaireByName("pose-electricite").formulaire["gammes-produits-pose-electricite"].appareils_electrique_a_remplacer;
    this.disjoncteur_a_remplacer=this.gestiondesdevisService.getFormulaireByName("pose-electricite").formulaire["gammes-produits-pose-electricite"].remplacement_disjoncteur;
    console.log("a ajouter ",this.appareils_a_ajouter );
    console.log("a remplacer ",this.appareils_a_remplacer );
  }
  get_title(slug:string){
    return slug.split(":")[1];
  }
  get_label(slug: any): string {
    // Convert the value to a boolean if it is a string
    const booleanSlug = (slug === 'true' || slug === true) ? true : false;
  
    return booleanSlug ? 'oui' : 'non';
  }
}
