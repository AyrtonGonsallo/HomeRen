import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { AuthServiceService } from '../../../services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { filter, firstValueFrom, from, of, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-liste-des-devis',
  templateUrl: './liste-des-devis.component.html',
  styleUrl: './liste-des-devis.component.css'
})
export class ListeDesDevisComponent {
  faire_visite_technicien=false
  visite_payee=false
  acompte_paye=false
  faire_acompte=false
  listOfData: any 
  faTrash=faTrash;
  total:number=0
  baseurl=environment.imagesUrl
  checkout_succeed:boolean=false
  checkout_cancel:boolean=false
  page_actuelle_panier=false
  taux_acompte=0
  prix_visite=0
  prix_acompte=0
  device_id=""
  
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
    this.device_id=this.panierService.getUniqueDeviceId()
  }

  async ngOnInit(): Promise<void> {
    this.get_params()
    this.page_actuelle_panier=true
    await this.get_devis_datas();
    // Attendre la récupération des paramètres de l'URL
  const params = await firstValueFrom(this.route.queryParams);
  const checkout = parseInt(params['checkout']);

  if (checkout === 1) {
    this.checkout_succeed = true;

    // Vérifier si l'utilisateur est connecté
    const isConnected = await firstValueFrom(this.authService.getIsConnected().pipe(take(1))); 

    this.isconnected = isConnected;
    console.log("Utilisateur connecté :", this.isconnected);

    if (!this.isconnected) {
      console.log("L'utilisateur n'est pas connecté.");
      this.router.navigate(['/connexion']);
      return;
    }

    console.log("faire_visite_technicien :", this.faire_visite_technicien);
    console.log("faire_acompte :", this.faire_acompte);

    if (!(this.faire_visite_technicien || this.faire_acompte)) {
      console.warn("Aucune action requise, arrêt du processus.");
      return;
    }

    const user_id = this.authService.getUser().Id;
    console.log("Utilisateur ID :", user_id);

    // Préparer les données
    const datas = {
      liste_devis: this.listOfData,
      prix_acompte: this.prix_acompte,
      prix_visite: this.prix_visite
    };

    console.log("Données à envoyer :", datas);

    try {
      // Envoyer l'email
      const mailRequest = this.faire_visite_technicien
        ? await this.userService.sendAllVisitedDevisPiecetoUserAsync(this.device_id, user_id)
        : await this.userService.sendAllPayedDevisPiecetoUserAsync(this.device_id, user_id);
      console.log("Résultat de l'envoi du mail :", mailRequest);

      // Mettre à jour les devis
      const updateRequest = this.faire_visite_technicien
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

  // Rafraîchir le panier à la fin
  this.panierService.refresh();
    
  }

  ngOnDestroy() {
    this.page_actuelle_panier=false
  }



  get_devis_datas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.panierService.getItems().subscribe(
        (items) => {
          if (!items || items.length === 0) {
            console.warn("Aucune donnée reçue, tentative de rechargement...");
            return; // Ne pas exécuter la suite si le tableau est vide
          }
          this.listOfData = items;
          console.log('Devis du panier: ', this.listOfData);
         
          this.total=parseFloat((this.panierService.getTotal()*1).toFixed(2));
          this.prix_acompte=this.taux_acompte*this.total/100
          if(items[0]?.Visite?.Paye && !items[0]?.VisiteFaite){
            this.visite_payee=true
            console.log("le premier devis a la visite payee")
          }
          else if(items[0]?.VisiteFaite){
            this.faire_visite_technicien=false
            this.faire_acompte=true
            if(items[0]?.Visite?.Payed){
              this.acompte_paye=true
              console.log("le premier devis a l'acompte payee")
            }
            
            console.log("le premier devis n'a pas d'acompte donc il faut lui faire payer l'acompte - taux : ",this.prix_acompte)
          }else{
            this.faire_acompte=false
            this.faire_visite_technicien=true
            console.log("le premier devis n'a pas de visite donc il faut lui faire payer la visite - prix : ",this.prix_visite)
          }
          console.log("faire visite",this.faire_visite_technicien)
          console.log("visite_payee",this.visite_payee)
          console.log("faire acompte",this.faire_acompte)
          console.log("checkout succeed",this.checkout_succeed)
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
            this.checkout()
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
            this.checkout()
          }, 2000);
        }
      } else {
        console.log('L\'utilisateur n\'est pas connecté.');
        this.router.navigate(['/connexion']);
      }
    });
  }


  async checkout() {
    let amount=0
    if(this.faire_acompte){
      amount=parseFloat(this.prix_acompte.toFixed(2))
      console.log("crearion de la session stripe",amount)
    }else{
      amount=this.prix_visite
    }
    // Construire correctement l'objet à envoyer au serveur
    const datas = {
      montant: amount, // Assurez-vous que `this.total` est bien un nombre
      liste_devis: this.listOfData, // Une liste des devis
      url_de_retour: environment.url_de_retour,
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
