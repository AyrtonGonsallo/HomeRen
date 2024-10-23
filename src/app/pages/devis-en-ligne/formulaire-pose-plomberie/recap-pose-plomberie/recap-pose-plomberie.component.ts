import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
interface AppareilFormData {
  "modele": string;
  "depose": boolean;
  // Ajoutez d'autres champs si nécessaire
}

@Component({
  selector: 'app-recap-pose-plomberie',
  templateUrl: './recap-pose-plomberie.component.html',
  styleUrl: './recap-pose-plomberie.component.css'
})// Exemple de type d'un appareil

export class RecapPosePlomberieComponent {
  @Input() selectedPiece: any;
  posePlomberieForm: any;
  appareilschoisis: any[] = [];

  constructor(
    private gestiondesdevisService: GestionDesDevisService,
    private userService: ApiConceptsEtTravauxService
  ) {
    this.posePlomberieForm = (this.gestiondesdevisService.getFormulaireByName("pose-plomberie-s"))?this.gestiondesdevisService.getFormulaireByName("pose-plomberie-s"):this.gestiondesdevisService.getFormulaireByName("pose-plomberie-c");
console.log(this.posePlomberieForm)
    // Typage explicite pour appareils_form_data
    let appareils_form_datas: AppareilFormData[] = (this.posePlomberieForm.formulaire["gammes-produits-pose-plomberie"].appareils_salle_de_bain)?this.posePlomberieForm.formulaire["gammes-produits-pose-plomberie"].appareils_salle_de_bain:this.posePlomberieForm.formulaire["gammes-produits-pose-plomberie"].appareils_cuisine;

    // Utilisation du typage pour le paramètre appareil
    appareils_form_datas.forEach((appareil: AppareilFormData) => {
      const appareilModele = appareil["modele"];
      const appareilDepose = appareil["depose"];
      
      if (appareilModele.split(":")[2]) {
        const id = appareilModele.split(":")[0];
        const titre = appareilModele.split(":")[1];
        const prix = appareilModele.split(":")[2];
        const depose = appareilDepose;
        this.appareilschoisis.push({ id: id,prix:prix,titre:titre,depose:depose });
      }
    });

    console.log("choisis: ", this.appareilschoisis);
  }
}