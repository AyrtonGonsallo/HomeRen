import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder } from '@angular/forms';
import { firstValueFrom, forkJoin } from 'rxjs';
import { AuthServiceService } from '../../../services/auth-service.service';

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

    this.load_parametres()
     
    
  }


  baseurl=environment.apiUrl
  page_seo_details:any
  constructor(private metaService: Meta,private authService:AuthServiceService,private titleService: Title,private route:ActivatedRoute,private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {

  }


  doit_payer_visite = false
  doit_payer_acompte = false
  tva = 0
  coefficient = 0
  taux_acompte = 0
  prix_visite=0
  prix_acompte = 0


  load_parametres() {

  forkJoin({
    tva: this.userService.get_parametre_by_id_or_nom(6, "TVA"),
    coefficient: this.userService.get_parametre_by_id_or_nom(1, "coefficient"),
    acompte: this.userService.getParametreById(2),
    prixVisite: this.userService.getParametreById(3)
  }).subscribe({
    next: (result) => {

      this.tva = 1 + result.tva.Valeur / 100;
      this.coefficient = result.coefficient.Valeur;
      this.taux_acompte = result.acompte.Valeur;
      this.prix_visite = result.prixVisite.Valeur;

      console.log("tva", this.tva);
      console.log("coefficient", this.coefficient);
      console.log("taux_acompte", this.taux_acompte);
      console.log("prix_visite", this.prix_visite);

      // Tout est chargé ici
      this.getprojetDetails(this.projetId);

    },
    error: (error) => {
      console.error('Erreur lors du chargement des paramètres', error);
    }
  });
}
  
  calculerPrixTTC(prix: number,tva:number): number {
    const total = prix * this.coefficient * (1+tva/100);
    return Math.round(total * 100) / 100; // arrondi à 2 décimales
  }

  

  
  isconnected=false
  total_visite = 0
  total_acompte = 0
  page_actuelle_panier=false
  // Méthode pour récupérer les détails de l'utilisateur à partir de l'API
  getprojetDetails(id: string): void {


    
    this.userService.get_projet( parseInt(id, 10)).subscribe(
      async (response) => {
        console.log("réponse de la requette get projet details",response);
        this.projet=response

        if(this.projet.Status=='visite à régler'){
          this.doit_payer_visite=true
        }else if(this.projet.Status=='projet validé'){
          this.doit_payer_acompte=true
        }

        for(let item of this.projet.Devis){
          this.total_visite+=this.calculerPrixTTC(item.Prix??0,item.Tva.Valeur);
          this.total_acompte+=this.calculerPrixTTC(item.Prix??0,item.Tva.Valeur);
              
              
        }

        console.log('infos ',this.taux_acompte,this.total_acompte)
        this.prix_acompte=this.taux_acompte*this.total_acompte/100


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


  
  Check_login_and_send_mails_details_to_pay_visite(){
    this.authService.getIsConnected().subscribe((isConnected) => {
      this.isconnected = isConnected;
      if (this.isconnected) {
        let user_id=this.authService.getUser().Id
        console.log('L\'utilisateur est connecté :', this.isconnected," id : ",user_id);
        
          setTimeout(() => {
            this.checkout(false)
          }, 2000);
        
      } else {
        console.log('L\'utilisateur n\'est pas connecté.');
        this.router.navigate(['/connexion']);
      }
    });
  }

  Check_login_and_send_mails_details_to_pay_acompte(){
    this.authService.getIsConnected().subscribe((isConnected) => {
      this.isconnected = isConnected;
      if (this.isconnected) {
        let user_id=this.authService.getUser().Id
        console.log('L\'utilisateur est connecté :', this.isconnected," id : ",user_id);
       
          setTimeout(() => {
            this.checkout(true)
          }, 2000);
        
      } else {
        console.log('L\'utilisateur n\'est pas connecté.');
        this.router.navigate(['/connexion']);
      }
    });
  }
  

  
  async checkout(faire_acompte:boolean) {
    console.log('faire_acompte',faire_acompte)
    let amount=0
    let liste =[]
    if(faire_acompte){
      amount=parseFloat(this.prix_acompte.toFixed(2))
      console.log("crearion de la session stripe",amount)
      liste=this.projet.Devis
    }else{
      amount=this.prix_visite
      liste=this.projet.Devis
    }
    // Construire correctement l'objet à envoyer au serveur
    const datas = {
      montant: amount, // Assurez-vous que `this.total` est bien un nombre
      liste_devis: liste, // Une liste des devis
      url_de_retour: environment.url_de_retour,
      payer_visite:!faire_acompte,
      payer_acompte:faire_acompte,
    };
  
    this.userService.createCheckoutSession(datas).subscribe(
      (response) => {
        console.log('URL de paiement Stripe : ', response.url);
        // Rediriger l'utilisateur vers Stripe
        window.location.href = response.url;
      },
      (error) => {
        console.error('Erreur lors de la creation de la session stripe :', error);
      }
    );
  }


  
}
