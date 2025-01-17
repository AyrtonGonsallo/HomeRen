import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { AuthServiceService } from '../../../services/auth-service.service';

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
  ngOnInit(): void {
    this.get_devis_datas()
    
    
  }
  get_devis_datas(){
    this.panierService.getItems().subscribe(
      (items) => {
        this.listOfData = items;
        console.log('Devis du panier: ', this.listOfData);
        this.total=parseFloat(this.panierService.getTotal().toFixed(2));
      },
      (error) => {
        console.error('Erreur lors de la récupération des devis :', error);
      }
    );
  }
  constructor(private router: Router,private authService:AuthServiceService,private panierService:ShoppingCartService,private userService: ApiConceptsEtTravauxService) {
   
  }
  supprimer_devis(id:number){
    this.panierService.valider_devis(id)
   
  }
  isconnected=false
  Check_login_and_send_mails_details(){
    this.authService.getIsConnected().subscribe((isConnected) => {
      this.isconnected = isConnected;
      let user_id=this.authService.getUser().Id
      if (this.isconnected) {
        console.log('L\'utilisateur est connecté :', this.isconnected," id : ",user_id);
        this.userService.sendAllPayedDevisPiecetoUser(user_id).subscribe(
          (response) => {
            console.log('Résultat de l\'envoi: ', response);
          },
          (error) => {
            console.error('Erreur lors de la récupération des devis :', error);
          }
        );
       
      } else {
        console.log('L\'utilisateur n\'est pas connecté.');
        this.router.navigate(['/connexion']);
        
      }
    });
  }

}
