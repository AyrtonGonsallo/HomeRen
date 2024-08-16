import { Component, Input } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-recap-pose-sol',
  templateUrl: './recap-pose-sol.component.html',
  styleUrl: './recap-pose-sol.component.css'
})
export class RecapPoseSolComponent {
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  poseSolForm:any
  gamme_id:any
  gamme:any
  plinthe_id:any
  plinthe:any
  constructor(private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.poseSolForm=this.gestiondesdevisService.getFormulaireByName("pose-sol");
    console.log("recap: ",this.poseSolForm);
    this.gamme_id=this.poseSolForm.formulaire["gammes-produits-pose-sol"].gamme.split(":")[0]
    this.userService.getGammeByID(this.gamme_id).subscribe(
      (response: any) => {
        console.log('recuperation de la gamme:', response);
        this.gamme=response
      },
      (error: any) => {
        console.error('Erreur lors de la recuperation de la gamme:', error);
      }
    );
    this.plinthe_id=this.poseSolForm.formulaire["gammes-produits-pose-sol"].plinthes.split(":")[0]
    this.userService.getGammeByID(this.plinthe_id).subscribe(
      (response: any) => {
        console.log('recuperation de la gamme:', response);
        this.plinthe=response
      },
      (error: any) => {
        console.error('Erreur lors de la recuperation de la gamme:', error);
      }
    );
  }
}