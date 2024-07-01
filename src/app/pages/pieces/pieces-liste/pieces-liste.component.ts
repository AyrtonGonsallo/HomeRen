import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Piece } from '../../../Models/Piece';
import { Realisation } from '../../../Models/Realisation';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pieces-liste',
  templateUrl: './pieces-liste.component.html',
  styleUrl: './pieces-liste.component.css'
})
export class PiecesListeComponent {

  
  baseurl=environment.apiUrl
  ngOnInit(): void {
    this.loadPieces()
    
    this.recalculateMaxHeight()
  }

  recalculateMaxHeight(): void {
    // Allow time for DOM updates before calculation
    setTimeout(() => {
      const contentPieces = document.getElementsByClassName('eq-h-piece') as HTMLCollectionOf<HTMLElement>;
      let maxHeight = 0;
      console.log('contentPieces:', contentPieces);
      Array.from(contentPieces).forEach(piece => {
        const pieceHeight = piece.offsetHeight;
        if (pieceHeight > maxHeight) {
          maxHeight = pieceHeight;
        }
      });
      maxHeight=(maxHeight<300)?maxHeight:110;
      console.log('La hauteur maximale est:', maxHeight);
      // Set the maximum height to all content pieces
      Array.from(contentPieces).forEach(piece => {
        piece.style.height = `${maxHeight}px`;
      });
    }, 2000);
  }

  constructor(private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {

  }


  pieces: Piece[] = [];

  

  loadPieces(): void {
    this.userService.getNbrPieces(6).subscribe(
      (response) => {
        this.pieces = response;
        console.log("réponse de la requette getPieces",this.pieces);
        this.recalculateMaxHeight();
      },
      (error) => {
        console.error('Erreur lors de la recuperation des pieces :', error);
      }
    );
  }
}
