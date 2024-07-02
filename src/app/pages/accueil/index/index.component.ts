import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { Piece } from '../../../Models/Piece';
import { Realisation } from '../../../Models/Realisation';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {

  
  baseurl=environment.apiUrl
  ngOnInit(): void {
    this.loadPieces()
    this.loadRealisations()
    this.recalculateMaxHeight()
  }

  recalculateMaxHeight(): void {
    // Allow time for DOM updates before calculation
    setTimeout(() => {
      if (typeof document !== 'undefined') {
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
        
      } else {
        // Handle non-browser environment (if needed)
        const contentPieces = [];
        console.warn('document object is not defined. Running in a non-browser environment.');
      }
      
    }, 2000);
  }

  constructor(private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {

  }


  pieces: Piece[] = [];
  realisations: Realisation[] = [];

  loadRealisations(): void {
    this.userService.getNbrRealisations(3).subscribe(
      (response) => {
        this.realisations = response;
        console.log("réponse de la requette getrealisations",this.realisations);
      },
      (error) => {
        console.error('Erreur lors de la recuperation des realisations :', error);
      }
    );
  }

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
