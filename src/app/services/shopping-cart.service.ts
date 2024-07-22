import { Injectable } from '@angular/core';
import { ApiConceptsEtTravauxService } from './api-concepts-et-travaux.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
interface CartItem {
     ID: number;
    Username: string;
    AdresseIP: string;
    Date: Date;
    Commentaire?: string;
    PieceID: number;
    Prix?: number ;
    Payed: number ;
    UtilisateurID?: number;
    DevisTaches:any[];
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private itemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  private items: CartItem[] = [];

  constructor(private http: HttpClient, private userService: ApiConceptsEtTravauxService) {
    if (typeof window !== 'undefined') {
      this.initializeCart();
    }
  }

  private apiUrl = 'https://api.ipify.org?format=json';

  userIp: string = '';
  browserInfo: string = '';

  getIp(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getItems(): Observable<CartItem[]> {
    return this.itemsSubject.asObservable();
  }

  addItem(item: CartItem): void {
    const existingItem = this.items.find(i => i.ID === item.ID);
    if (!existingItem) {
      this.items.push(item);
      this.itemsSubject.next(this.items);
    }
  }

  removeItem(itemId: number): void {
    this.items = this.items.filter(item => item.ID !== itemId);
    this.itemsSubject.next(this.items);
  }

  clearCart(): void {
    this.items = [];
    this.itemsSubject.next(this.items);
  }

  getItemCount(): number {
    return this.items.length;
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + (item.Prix ?? 0), 0);
  }

  private initializeCart(): void {
    if (typeof window !== 'undefined') {
      this.getBrowserInfo();
      this.getIp().subscribe(
        (response) => {
          this.userIp = response.ip;
          const json = {
            username: this.browserInfo,
            ip: this.userIp,
          };
          this.userService.getAllPayedDevisPiecebyUsernameAndIp(json).subscribe(
            (response) => {
              this.items = response;
              this.itemsSubject.next(this.items);
            },
            (error) => {
              console.error('Erreur lors de la récupération des devis :', error);
            }
          );
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'adresse IP :', error);
        }
      );
    }
  }

  


  getBrowserInfo(): void {
    this.browserInfo = navigator.userAgent;
  }
}