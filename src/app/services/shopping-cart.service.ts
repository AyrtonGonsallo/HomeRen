import { Injectable } from '@angular/core';
import { ApiConceptsEtTravauxService } from './api-concepts-et-travaux.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
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
  valider_devis(id:number){
    this.userService.validerDevisPiece(id,{"id":id}).subscribe(
      (response) => {
        console.log("devis validé")
        this.initializeCart()
      },
      (error) => {
        console.error('Erreur lors de la validation du devis :', error);
      })
  }



  private initializeCart(): void {
    if (typeof window !== 'undefined') {
      let device_id=this.getUniqueDeviceId()
      console.log("id appareil:",device_id)
      this.getBrowserInfo();
      this.getIp().subscribe(
        (response) => {
          this.userIp = response.ip;
          const json = {
            username: this.browserInfo,
            ip: this.userIp,
          };
          this.userService.getAllPayedDevisPiecebyDeviceID(this.getUniqueDeviceId()).subscribe(
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

  private readonly storageKey = 'unique-device-id';

  

  getUniqueDeviceId(): string {
    let deviceId = localStorage.getItem(this.storageKey);

    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem(this.storageKey, deviceId);
    }

    return deviceId;
  }


  getBrowserInfo(): void {
    this.browserInfo = navigator.userAgent;
  }
}