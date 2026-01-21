import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { AuthServiceService } from '../../../services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { filter, firstValueFrom, from, of, switchMap, take, tap } from 'rxjs';
import { it } from 'node:test';

@Component({
  selector: 'app-liste-des-devis',
  templateUrl: './liste-des-devis.component.html',
  styleUrl: './liste-des-devis.component.css'
})
export class ListeDesDevisComponent {
  visite_Acompte:any
  faire_visite_technicien=false
  visite_payee=false
  visite_faite=false
  acompte_paye=false
  faire_acompte=false
  listOfDevisToPayVisit: any 
  projectToPayVisit: any 
  listOfDevisToPayAcompt: any 
  projectToPayAcompt: any 
  listOfDevisToVisit: any 
  ProjectToVisit: any 
  listOfCurrentDevis: any 
  faTrash=faTrash;
  total_visite:number=0
  total_attente_visite:number=0
  total_acompte:number=0
  total:number=0
  baseurl=environment.imagesUrl
  checkout_succeed:boolean=false
  checkout_cancel:boolean=false
  page_actuelle_panier=false
  taux_acompte=0
  prix_visite=0
  prix_acompte=0
  device_id=""
  res_titre=""
  
  get_params(){
    this.userService.getParametreById(2).subscribe(
      (r) => {
        this.taux_acompte=r.Valeur
       
      },
      (e) => {
        console.error("Erreur lors de la recuperation des parametres :", e);
      }
    );

    this.userService.getParametreById(3).subscribe(
      (r) => {
        this.prix_visite=r.Valeur
      },
      (e) => {
        console.error("Erreur lors de la recuperation des parametres :", e);
      }
    );
    //this.device_id=this.panierService.getUniqueDeviceId()
    this.device_id="dsds"
  }

  
  tva = 0
  coefficient = 0
  load_parametres(){
    this.userService.get_parametre_by_id_or_nom(6,"TVA")
        .subscribe(
          (data) => {
            this.tva=(1+data.Valeur/100);
            console.log("tva value ",this.tva)
          },
          (error) => {
            console.error('Erreur lors de la recupération des parametres', error);
          });

    this.userService.get_parametre_by_id_or_nom(1,"coefficient")
        .subscribe(
          (data) => {
            this.coefficient=data.Valeur;
             console.log("coeff value ",this.coefficient)
          },
          (error) => {
            console.error('Erreur lors de la recupération des parametres', error);
          });
  }

  calculerPrixTTC(prix: number): number {
    const total = prix * this.coefficient * this.tva;
    return Math.round(total * 100) / 100; // arrondi à 2 décimales
  }

  async ngOnInit(): Promise<void> {
    this.load_parametres()
    this.authService.checkAuthenticationOrRedirect();
    this.get_params()
    this.page_actuelle_panier=true

    await this.get_devis_to_visit_datas();
    await this.get_devis_to_pay_datas();
    
    await this.get_devis_en_attente_de_visite();

    console.log("faire visite",this.faire_visite_technicien)
    console.log("visite_payee",this.visite_payee)
    console.log("faire acompte",this.faire_acompte)
    console.log("checkout succeed",this.checkout_succeed)
    // Attendre la récupération des paramètres de l'URL
    const params = await firstValueFrom(this.route.queryParams);
    const checkout = parseInt(params['checkout']);
    const parametre_visite = (params['visite'] === "true") ;
    const parametre_acompte = (params['acompte'] === "true") ;

    if (checkout === 1) {
      this.checkout_succeed = true;
      this.faire_visite_technicien=false
      this.faire_acompte=false
      // Vérifier si l'utilisateur est connecté
      const isConnected = await firstValueFrom(this.authService.getIsConnected().pipe(take(1))); 

      this.isconnected = isConnected;
      console.log("Utilisateur connecté :", this.isconnected);

      if (!this.isconnected) {
        console.log("L'utilisateur n'est pas connecté.");
        this.router.navigate(['/connexion']);
        return;
      }

      console.log("parametre_visite :", parametre_visite);
      console.log("parametre_acompte :", parametre_acompte);

      if (!(parametre_visite || parametre_acompte)) {
        console.warn("Aucune action requise, arrêt du processus.");
        return;
      }

      if ((!this.listOfDevisToPayAcompt && parametre_acompte)) {
        
        console.warn("accompte mais pas de devis listOfDevisToPayAcompt",this.listOfDevisToPayAcompt);
        return;
      }
      else if ((this.listOfDevisToPayAcompt && parametre_acompte)){
        this.res_titre="PAIEMENT DE L'ACOMPTE"
        this.visite_faite=true
        this.acompte_paye=true
      }

      if ((!this.listOfDevisToPayVisit && parametre_visite)) {
        console.warn("visite mais pas de devis listOfDevisToPayVisit",this.listOfDevisToPayVisit);
        return;
      }else if(this.listOfDevisToPayVisit && parametre_visite){
        this.res_titre="VISITE DU TECHNICIEN"
      }

      const user_id = this.authService.getUser().Id;
      console.log("Utilisateur ID :", user_id);

      // Préparer les données
      const datas = {
        projet_id: (parametre_acompte)?this.projectToPayAcompt.Id:this.projectToPayVisit.Id, 
        prix_acompte: this.prix_acompte,
        prix_visite: this.prix_visite
      };

      console.log("Données à envoyer :", datas);

      try {
        const visitprojet = parametre_visite?this.projectToPayVisit.Id:null


        // Envoyer l'email
        const mailRequest = parametre_visite
          ? await this.userService.sendAllVisitedDevisPiecetoUserAsync(this.device_id, user_id,visitprojet)
          : await this.userService.sendAllPayedDevisPiecetoUserAsync(this.device_id, user_id,this.prix_acompte);
        console.log("Résultat de l'envoi du mail :", mailRequest);

        // Mettre à jour les devis
        const updateRequest = parametre_visite
          ? await this.userService.updateVisitedDevisAsync(datas)
          : await this.userService.updatePayedDevisAsync(datas);
        console.log("Résultat de la mise à jour :", updateRequest);
      } catch (error) {
        console.error("Erreur lors de l'envoi ou de la mise à jour :", error);
      }
    } else if (checkout === -1) {
      this.checkout_cancel = true;
    } else {
      this.checkout_succeed = false;
    }

    console.log("Checkout :", checkout);

    
    
    await this.get_devis_to_visit_datas();
    await this.get_devis_to_pay_datas();
    await this.get_devis_en_attente_de_visite();
    // Rafraîchir le panier à la fin
    this.panierService.refresh();
    
  }

  ngOnDestroy() {
    this.page_actuelle_panier=false
  }



  get_devis_to_pay_datas(): Promise<void> {
    this.total_acompte=0
    return new Promise((resolve, reject) => {
      this.panierService.getProjectToPayAcompte().subscribe(
        (projet) => {
          if(projet.Devis){
            this.projectToPayAcompt = projet
            this.listOfDevisToPayAcompt = projet.Devis;
            this.visite_Acompte = projet.Visite
            console.log('Devis ou il faut payer l\'acompte ', this.listOfDevisToPayAcompt);
            if(this.listOfDevisToPayAcompt?.length>0){
              for(let item of this.listOfDevisToPayAcompt){
                this.total_acompte+=this.calculerPrixTTC(item.Prix??0);
                
              }
              this.prix_acompte=this.taux_acompte*this.total_acompte/100
              this.faire_acompte=true
              if(this.projectToPayAcompt?.VisiteFaite){
              
              this.visite_faite=true
                if(this.projectToPayAcompt?.Visite?.Payed){
                  this.acompte_paye=true
                  console.log("le premier devis a l'acompte payee")
                }
                
                
                console.log("le premier devis n'a pas d'acompte donc il faut lui faire payer l'acompte - taux : ",this.prix_acompte)
              }
          }else{
            console.log("rien")
          }
          }
          
         
         
          resolve(); //  Fin de la méthode (permet de continuer l'exécution)
        },
        (error) => {
          console.error('Erreur lors de la récupération des devis :', error);
          reject(error); //  Bloque l'exécution si une erreur survient
        }
      );

    });
  }

  get_devis_to_visit_datas(): Promise<void> {
    this.total_visite=0
    return new Promise((resolve, reject) => {

      this.panierService.getProjectToPayVisit().subscribe(
        (projet) => {
          if(projet.Devis){
            this.projectToPayVisit=projet
            this.listOfDevisToPayVisit = projet.Devis;
            console.log('projet ou il faut payer la visite: ', this.projectToPayVisit);
            if(!this.projectToPayVisit?.Visite){
              this.faire_visite_technicien=true
              console.log("le projet n'a pas de visite donc il faut lui faire payer la visite - prix : ",this.prix_visite)
            } 
            
            for(let item of this.listOfDevisToPayVisit){
              this.total_visite+=this.calculerPrixTTC(item.Prix??0);
              
            }
              
            if(this.projectToPayVisit?.Visite?.Paye && !this.projectToPayVisit?.VisiteFaite){
              this.visite_payee=true
              console.log("le premier devis a la visite payee")
            }
          }
         
          resolve(); //  Fin de la méthode (permet de continuer l'exécution)
        },
        (error) => {
          console.error('Erreur lors de la récupération des devis :', error);
          reject(error); //  Bloque l'exécution si une erreur survient
        }
      );


    });
  }





  get_devis_en_attente_de_visite(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.panierService.getProjectEnAttenteDeVisite().subscribe(
        (projet) => {
          if(projet.Devis){
            this.total_attente_visite=0
            this.ProjectToVisit = projet;
            this.listOfDevisToVisit = projet.Devis;
            console.log("devis a visiter ",this.listOfDevisToVisit);
            for(let item of this.listOfDevisToVisit){
              this.total_attente_visite+=this.calculerPrixTTC(item.Prix??0);
              
            }
          }
         
          resolve(); //  Fin de la méthode (permet de continuer l'exécution)
        },
        (error) => {
          console.error('Erreur lors de la récupération des devis :', error);
          reject(error); //  Bloque l'exécution si une erreur survient
        }
      );
    });
  }



  constructor(private route: ActivatedRoute,private router: Router,private authService:AuthServiceService,private panierService:ShoppingCartService,private userService: ApiConceptsEtTravauxService) {
   
  }
  supprimer_devis(id:number){
    this.panierService.delete_devis(id)
    window.location.reload()
  }
  isconnected=false


  Check_login_and_send_mails_details_to_pay_visite(){
    this.authService.getIsConnected().subscribe((isConnected) => {
      this.isconnected = isConnected;
      if (this.isconnected) {
        let user_id=this.authService.getUser().Id
        console.log('L\'utilisateur est connecté :', this.isconnected," id : ",user_id);
        if(this.page_actuelle_panier){
          setTimeout(() => {
            this.checkout(false)
          }, 2000);
        }
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
        if(this.page_actuelle_panier){
          setTimeout(() => {
            this.checkout(true)
          }, 2000);
        }
      } else {
        console.log('L\'utilisateur n\'est pas connecté.');
        this.router.navigate(['/connexion']);
      }
    });
  }


  async checkout(faire_acompte:boolean) {
    let amount=0
    let liste =[]
    if(faire_acompte){
      amount=parseFloat(this.prix_acompte.toFixed(2))
      console.log("crearion de la session stripe",amount)
      liste=this.listOfDevisToPayAcompt
    }else{
      amount=this.prix_visite
      liste=this.listOfDevisToPayVisit
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
