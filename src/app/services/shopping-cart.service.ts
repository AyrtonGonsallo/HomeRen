import { Injectable } from '@angular/core';
import { ApiConceptsEtTravauxService } from './api-concepts-et-travaux.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { AuthServiceService } from './auth-service.service';
interface CartItem {
     ID: number;
    Nom: string;
    Description: string;
    Date_de_creation: Date;
    Client?: any;
    Artisans: any[];
    Status?: string ;
    Payed: number ;
    UtilisateurID?: number;
    VisiteFaite:Boolean;
    Visite:any;
    Devis:any[];
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private itemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  private items: CartItem[] = [];

  constructor(private http: HttpClient, private userService: ApiConceptsEtTravauxService,private authService:AuthServiceService) {
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
    return this.items[0].Devis.reduce((total, item) => total + (item.Prix ?? 0), 0);
  }
  delete_devis(id:number){
    this.userService.deleteDevisPiece(id).subscribe(
      (response) => {
        console.log("devis supprimé")
        this.initializeCart()
      },
      (error) => {
        console.error('Erreur lors de la suppression du devis :', error);
      })
  }

  
refresh(){
  this.initializeCart()
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
          this.userService.getAllNoPayedProjectPiecebyUser("sadsd",this.authService.getUser()?.Id??0).subscribe(//this.getUniqueDeviceId()
            (response) => {
              this.items = response;
              this.itemsSubject.next(this.items);
            },
            (error) => {
              this.items = [];
              this.itemsSubject.next(this.items);
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


  getProjectToPayVisit(): Observable<CartItem> {
    return this.userService.getAllProjectToPayVisitbyUser(
      //this.getUniqueDeviceId(),
      "assa",
      this.authService.getUser()?.Id ?? 0
    ).pipe(
      map((response) => {
        // transforme la réponse en CartItem[] si nécessaire
        return response as CartItem; // ou applique une transformation ici
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des devis à payer la visite :', error?.error?.message);
        return of({} as CartItem); // retourne un Observable<CartItem[]> vide en cas d'erreur
      })
    );
  }

  getProjectToPayAcompte(): Observable<CartItem> {
    return this.userService.getAllProjectToPayAcomptbyUser(
      "sdad",
      //this.getUniqueDeviceId(),
      this.authService.getUser()?.Id ?? 0
    ).pipe(
      map((response) => {
        // transforme la réponse en CartItem[] si nécessaire
        return response as CartItem; // ou applique une transformation ici
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des devis à payer la visite :', error?.error?.message);
        return of({} as CartItem); // retourne un Observable<CartItem[]> vide en cas d'erreur
      })
    );
  }

  getProjectEnAttenteDeVisite(): Observable<CartItem> {
    return this.userService.getAllNoVisitedProjectPiecebyUser(
      //this.getUniqueDeviceId(),
      "asd",
      this.authService.getUser()?.Id ?? 0
    ).pipe(
      map((response) => {
        // transforme la réponse en CartItem[] si nécessaire
        return response as CartItem; // ou applique une transformation ici
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des devis à payer la visite :', error?.error?.message);
        return of({} as CartItem); // retourne un Observable<CartItem[]> vide en cas d'erreur
      })
    );
  }


  getDevisTravauxEnCours(): Observable<CartItem> {
    return this.userService.getAllCurrentDevisPiecebyDeviceID(
      //this.getUniqueDeviceId(),
      "asda",
      this.authService.getUser()?.Id ?? 0
    ).pipe(
      map((response) => {
        // transforme la réponse en CartItem[] si nécessaire
        return response as CartItem; // ou applique une transformation ici
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des devis en cours :', error?.error?.message);
        return of({} as CartItem); // retourne un Observable<CartItem[]> vide en cas d'erreur
      })
    );
  }


}