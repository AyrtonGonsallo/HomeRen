import { Component, Renderer2 } from '@angular/core';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Piece } from '../../../Models/Piece';
import { environment } from '../../../environments/environment';
import { Travail } from '../../../Models/Travail';
import { GestionDesDevisService } from '../../../services/gestion-des-devis.service';
interface ItemData {
  ID: number;
  Titre: string;
  Description: string;
  Pieces: Piece[]
}


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  baseurl=environment.imagesUrl

  //chargement des pieces
  pieces_par_categories: any
  loadPieces(): void {
    this.userService.get_pieces_par_categories().subscribe(
      (response) => {
        this.pieces_par_categories = response;
        console.log("réponse de la requette getPiecesparcategories",this.pieces_par_categories);
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des pieces :', error);
      }
    );
  }
  ngOnInit(): void {
    this.loadPieces()
    this.getIpAddress();
    this.getBrowserInfo();
  }


 
  constructor(private renderer: Renderer2,private message: NzMessageService,private userService: ApiConceptsEtTravauxService,private gestiondesdevisService: GestionDesDevisService) {
 
  }


  //etape 1 choix de la piece
  selectedPiece:any
  selectedPieceId: number | null = null;
  selectPiece(pieceID: number): void {
    if (this.selectedPieceId !== null) {
      const previousElement = document.getElementById(`piece-${this.selectedPieceId}`);
      if (previousElement) {
        this.renderer.setStyle(previousElement, 'border', 'none');
        this.renderer.setStyle(previousElement, 'filter', 'brightness(1');

      }
    }
    this.selectedPieceId = pieceID;
    this.userService.getPiece(this.selectedPieceId).subscribe(
      (response) => {
        this.selectedPiece = response;
        console.log("réponse de la requette getPiece",this.travaux);
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des details de la piece choisie :', error);
      }
    );
    this.userService.getTravauxByPieceId(this.selectedPieceId).subscribe(
      (response) => {
        this.travaux = response;
        this.listOfData =response;
        this.listOfCurrentPageData=response
        console.log("réponse de la requette getTravauxByPieceId",this.travaux);
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des travaux par pieces :', error);
      }
    );
    const selectedElement = document.getElementById(`piece-${pieceID}`);
    if (selectedElement) {
      this.renderer.setStyle(selectedElement, 'border', '2px solid #FFC736');
      this.renderer.setStyle(selectedElement, 'filter', 'brightness(0.8)');
    }
  }

// chargement des travaux a faire dans la piece
  travaux:Travail[]=[]
 
  filteredTravaux: Travail[] = [];
  filterTravaux() {
    this.filteredTravaux = this.travaux.filter(travail => this.setOfCheckedId.has(travail.ID));
  }

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.ID, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.ID, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.ID, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.ID));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.ID)) && !this.checked;
  }

   // New function to check if a travail exists in filteredTravaux by ID
   travailExists(id: number): boolean {
    return this.filteredTravaux.some(travail => travail.ID === id);
  }


  // gestion des etapes du formulaire
  current = 0;
  index = 'First-content';
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }
  next(): void {
    this.current += 1;
    this.changeContent();
  }
  done(): void {
    const formulaires = this.gestiondesdevisService.getFormulaires();
      const json = {
        utilisateur: this.browserInfo,
        ip: this.userIp,
        liste_des_travaux: formulaires
      };
      console.log('Formulaires soumis :', json);
  }
  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = `d`;
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        this.filterTravaux()
        console.log("travaux choisis",this.filteredTravaux)
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
  
  userIp: string = '';
  browserInfo: string = '';
  getIpAddress() {
    this.gestiondesdevisService.getIp().subscribe(
      (response) => {
        this.userIp = response.ip;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'adresse IP :', error);
      }
    );
  }
  getBrowserInfo() {
    this.browserInfo = navigator.userAgent;
  }
  
}
