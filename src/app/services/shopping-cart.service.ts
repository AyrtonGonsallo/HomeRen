import { Injectable } from '@angular/core';
import { ApiConceptsEtTravauxService } from './api-concepts-et-travaux.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface CartItem {
     ID: number;
    Username: string;
    AdresseIP: string;
    Date: Date;
    Commentaire?: string;
    PieceID: number;
    Prix?: number ;
    UtilisateurID?: number;
    DevisTaches:any[];
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private items: CartItem[] = [];

  // Ajouter un objet au panier
  addItem(item: any): void {
    const existingItem = this.items.find(i => i.ID === item.ID);

    if (!existingItem) {
      this.items.push(item);
      
    } 
  }

  // Supprimer un objet du panier
  removeItem(itemId: number): void {
     this.items = this.items.filter(item => item.ID !== itemId);
  }
  // Obtenir tous les objets du panier
  getItems(): CartItem[] {
    return this.items;
  }

  // Vider le panier
  clearCart(): void {
    this.items = [];
  }

  // Obtenir le nombre d'objets dans le panier
  getItemCount(): number {
    return this.items.length;
  }

  // Obtenir le total du panier
  getTotal(): number {
    
    return this.items.reduce((total, item) => total + (item.Prix??0) , 0);
  }




  constructor(private http: HttpClient,private userService:ApiConceptsEtTravauxService) {
    if (typeof window !== 'undefined') {
      this.getBrowserInfo()
      this.getIp().subscribe(
        (response) => {
          this.userIp = response.ip;
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'adresse IP :', error);
        }
      );
      const json = {
        username: this.browserInfo,
        ip: this.userIp,
      };
      console.log(json)
      this.userService.getAllPayedDevisPiecebyUsernameAndIp(json).subscribe(
        (response) => {
          this.items=  response;
        },
        (error) => {
          console.error('Erreur lors de la récupération des devis :', error);
        }
      );
    }
   }
   userIp: string = '';
   browserInfo: string = '';

   private apiUrl = 'https://api.ipify.org?format=json';

 
  getIp(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  
   getBrowserInfo() {
     this.browserInfo = navigator.userAgent;
   }
}
