import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { Realisation } from '../../../Models/Realisation';
import { Piece } from '../../../Models/Piece';
import Splide from '@splidejs/splide';
import { Avis } from '../../../Models/Avis';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-realisations-liste',
  templateUrl: './realisations-liste.component.html',
  styleUrl: './realisations-liste.component.css'
})
export class RealisationsListeComponent {

  baseurl=environment.imagesUrl
  ngOnInit(): void {
    this.loadPieces()
    this.loadRealisations()
    this.loadAvis()
    
  }
  constructor(private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {

  }
  loadPieces(): void {
    this.userService.getPieces().subscribe(
      (response) => {
        this.pieces = response;
        console.log("réponse de la requette getPieces",this.pieces);
      },
      (error) => {
        console.error('Erreur lors de la recuperation des pieces :', error);
      }
    );
  }
  activePieceId: number | null = null;
  pieces: Piece[] = [];
  avis: Avis[] = [];
  realisations: Realisation[] = [];
  loadRealisations(): void {
    this.userService.getRealisations().subscribe(
      (response) => {
        this.realisations = response;
        console.log("réponse de la requette get realisations",this.realisations);
      },
      (error) => {
        console.error('Erreur lors de la recuperation des realisations :', error);
      }
    );
  }
  filter_by_piece(pid:number){
    
    if(pid==this.activePieceId){
      this.activePieceId=null
      this.userService.getRealisations().subscribe(
      (response) => {
        this.realisations = response;
        console.log("réponse de la requette get realisations",this.realisations);
      },
      (error) => {
        console.error('Erreur lors de la recuperation des realisations :', error);
      }
    );

    }else{
      this.activePieceId=pid
       this.userService.getRealisationsByPiece(pid).subscribe(
      (response2) => {
        this.realisations = response2;
        console.log("réponse de la requette filtrer par piece ",pid,this.realisations);
      },
      (error) => {
        console.error('Erreur lors de la recuperation de la requette filtrer par piece :', error);
      }

    );

    }
   
  }
  init_splide() {
    var splide = new Splide( '.splide', {
      perPage: 3,
      gap    : '2rem',
      breakpoints: {
        800: {
          perPage: 2,
          gap    : '.7rem',
          height : 'auto',
        },
        497: {
          perPage: 1,
          gap    : '.7rem',
          height : 'auto',
        },
      },
    } );
    
    splide.mount();

  }

  loadAvis(): void {
    this.userService.getAvis().subscribe(
      (response) => {
        this.avis = response;
        console.log("réponse de la requette get_avis",this.avis);
        // Utilisation de setTimeout pour différer l'appel à init_splide
      setTimeout(() => {
        this.init_splide();
      }, 100); // Délai de 1000 ms (1 seconde), ajustez selon vos besoins
      },
      (error) => {
        console.error('Erreur lors de la recuperation des avis :', error);
      }
    );
  }


 
}
