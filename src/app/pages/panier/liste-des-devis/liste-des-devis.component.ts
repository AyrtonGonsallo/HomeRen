import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { AuthServiceService } from '../../../services/auth-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-liste-des-devis',
  templateUrl: './liste-des-devis.component.html',
  styleUrl: './liste-des-devis.component.css'
})
export class ListeDesDevisComponent {
  listOfData: any 
  faTrash=faTrash;
  total:number=0
  baseurl=environment.imagesUrl
  checkout_succeed:boolean=false
  checkout_cancel:boolean=false
  page_actuelle_panier=false
  
  ngOnInit(): void {
    this.page_actuelle_panier=true
    this.get_devis_datas()
    this.route.queryParams.subscribe(params => {
      if(parseInt(params['checkout'])==1){
        this.checkout_succeed=true
      }else if(parseInt(params['checkout'])==-1){
        this.checkout_cancel=true
      }
      else{
        this.checkout_succeed=false
      }
      console.log("checkout ",parseInt(params['checkout']))
    });
    this.panierService.refresh()
    
  }

  ngOnDestroy() {
    this.page_actuelle_panier=false
  }
  get_devis_datas(){
    this.panierService.getItems().subscribe(
      (items) => {
        this.listOfData = items;
        console.log('Devis du panier: ', this.listOfData);
        this.total=parseFloat((this.panierService.getTotal()*1).toFixed(2));
      },
      (error) => {
        console.error('Erreur lors de la récupération des devis :', error);
      }
    );
  }
  constructor(private route: ActivatedRoute,private router: Router,private authService:AuthServiceService,private panierService:ShoppingCartService,private userService: ApiConceptsEtTravauxService) {
   
  }
  supprimer_devis(id:number){
    this.panierService.delete_devis(id)
   
  }
  isconnected=false
  Check_login_and_send_mails_details(){
    
    this.authService.getIsConnected().subscribe((isConnected) => {
      this.isconnected = isConnected;
      
      if (this.isconnected) {

        let user_id=this.authService.getUser().Id
        console.log('L\'utilisateur est connecté :', this.isconnected," id : ",user_id);
      
        this.userService.sendAllPayedDevisPiecetoUser(user_id).subscribe(
          (response) => {
            console.log('Résultat de l\'envoi: ', response);
          },
          (error) => {
            console.error('Erreur lors de la récupération des devis :', error);
          }
        );

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
    // Construire correctement l'objet à envoyer au serveur
    const datas = {
      montant: this.total, // Assurez-vous que `this.total` est bien un nombre
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
        console.error('Erreur lors de la récupération des devis :', error);
      }
    );
  }
  
  


}
