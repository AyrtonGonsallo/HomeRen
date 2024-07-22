import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-liste-des-devis',
  templateUrl: './liste-des-devis.component.html',
  styleUrl: './liste-des-devis.component.css'
})
export class ListeDesDevisComponent {
  listOfData: any 
  faTrash=faTrash;
  baseurl=environment.imagesUrl
  ngOnInit(): void {
    this.panierService.getItems().subscribe(
      (items) => {
        this.listOfData = items;
        console.log('Devis du panier: ', this.listOfData);
      },
      (error) => {
        console.error('Erreur lors de la récupération des devis :', error);
      }
    );
  }
  constructor(private router: Router,private panierService:ShoppingCartService,private userService: ApiConceptsEtTravauxService) {
   
  }


}
