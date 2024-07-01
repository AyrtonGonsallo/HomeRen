import { Component, Renderer2 } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Piece } from '../../../Models/Piece';
import { environment } from '../../../environments/environment';
import { IconService } from '@ant-design/icons-angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  baseurl=environment.apiUrl
  constructor(private _iconService: IconService,private renderer: Renderer2,private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {
  }
  ngOnInit(): void {
    this.loadPieces()
  }
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
    const selectedElement = document.getElementById(`piece-${pieceID}`);
    if (selectedElement) {
      this.renderer.setStyle(selectedElement, 'border', '2px solid #FFC736');
      this.renderer.setStyle(selectedElement, 'filter', 'brightness(0.8)');
    }
  }

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
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = `<div class="devis-content">
      <p class="ttl-dv-pc"><strong>Je rénove une pièce</strong></p>
      <div *ngFor="let ppc of pieces_par_categories">
         <p class="fs-20 mr-b-2"><strong>{{ppc?.Titre}}</strong></p>
         <div class="col-pcs-devis" >
            
            <div class="pcs-devis" id="piece-{{piece.ID}}" *ngFor="let piece of ppc.Pieces" (click)="selectPiece(piece.ID)">
               <img src="{{baseurl}}/files/{{piece.Image_presentation}}" alt="">
               <p class="blanc pcs-devis-ttle"><strong>{{piece.Titre}}</strong></p>
            </div>
         </div>
      </div>
   </div>`;
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

}
