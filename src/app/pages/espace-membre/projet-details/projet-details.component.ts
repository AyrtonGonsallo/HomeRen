import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-projet-details',
  templateUrl: './projet-details.component.html',
  styleUrl: './projet-details.component.css'
})
export class ProjetDetailsComponent {
  solde=0
  apiUrl = environment.imagesUrl.replace(/\/files\/?$/, '');
  projetId:string =  this.route.snapshot.paramMap.get('id')??'0';
  files:any
  paiements:any
  projet:any
  async ngOnInit(): Promise<void> {
      this.getprojetDetails(this.projetId)
      
  
      
  }
  baseurl=environment.apiUrl
  page_seo_details:any
  constructor(private metaService: Meta,private titleService: Title,private route:ActivatedRoute,private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {

  }
  
  
    
  
  // Méthode pour récupérer les détails de l'utilisateur à partir de l'API
  getprojetDetails(id: string): void {
    this.userService.get_projet( parseInt(id, 10)).subscribe(
      async (response) => {
        console.log("réponse de la requette get projet details",response);
       this.projet=response
       this.getProjetFiles(this.projet.Id)
       await this.get_all_projet_paiements()
        
      },
      (error) => {
        console.error('Erreur lors de la recuperation des details projet :', error);
      }
    );
    
  }

  getProjetFiles(projetId: number): void {
    this.userService.getFichiersByProjet(projetId).subscribe(
      (response) => {
        console.log("réponse de la requette fichiers",response);
        this.files=response
      },
      (error) => {
        console.error('Erreur lors de la recuperation des fichiers :', error);
      }
    );
    
  }



  get_all_projet_paiements(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        let solde = 0;
        let visiteAdded = false;
        const allPaiements: any[] = [];
  
        
          const response = await firstValueFrom(this.userService.get_all_projet_paiements(parseInt (this.projetId)));
  
          // response est un tableau de paiements pour ce devis
          response.forEach((paiement: any) => {
            if (paiement.Type === 'visite') {
              if (!visiteAdded) {
                solde += paiement.Montant;
                allPaiements.push(paiement);
                visiteAdded = true;
              }
              // si visiteAdded = true, on ignore les autres 'visite'
            } else {
              solde += paiement.Montant;
              allPaiements.push(paiement);
            }
          });
        
  
        console.log("Paiements récupérés :", allPaiements);
        this.paiements = allPaiements;
        this.solde = solde;
  
        resolve();
      } catch (error) {
        console.error('Erreur lors de la récupération des paiements de tous les devis :', error);
        reject(error);
      }
    });
  }
  


  
}
