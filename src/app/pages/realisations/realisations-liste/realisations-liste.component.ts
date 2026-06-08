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
import { Galerie } from '../../../Models/Galerie';
import { NzSelectSizeType } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-realisations-liste',
  templateUrl: './realisations-liste.component.html',
  styleUrl: './realisations-liste.component.css'
})
export class RealisationsListeComponent {

   size: NzSelectSizeType = 'default';
  tag_types: string[] = [];
tag_styles: number[] = [];
tag_pieces: number[] = [];

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
  activeStyleId: number | null = null;
  activetype: string | null = null;
  types = [
    'Réalisation','Proposition'
  ]
  pieces: Piece[] = [];
  avis: Avis[] = [];
  realisations: Realisation[] = [];
  filtered_realisations_ou_propositions: Galerie[] = [];
  realisations_ou_propositions: Galerie[] = [];
  styles: any[] = [];
  loadRealisations(): void {
    
    
     this.userService.getRealisationsouPropositions().subscribe(
      (response) => {
        this.realisations_ou_propositions = response;
        this.filtered_realisations_ou_propositions = response;
        console.log("réponse de la requette get realisations_ou_propositions",this.realisations_ou_propositions);
      },
      (error) => {
        console.error('Erreur lors de la recuperation des realisations_ou_propositions :', error);
      }
    );

     this.userService.getAllStyles().subscribe(
      (response) => {
        this.styles = response;
        console.log("réponse de la requette get styles",this.styles);
      },
      (error) => {
        console.error('Erreur lors de la recuperation des styles :', error);
      }
    );
  }
  

  applyFilters() {

  this.filtered_realisations_ou_propositions =
    this.realisations_ou_propositions.filter(r => {

      // PIECES
      const pieceOk =
        this.tag_pieces.length === 0 ||
        r.Pieces?.some(
          (p: any) => this.tag_pieces.includes(p.ID)
        );

      // STYLES
      const styleOk =
        this.tag_styles.length === 0 ||
        r.Styles?.some(
          (s: any) => this.tag_styles.includes(s.ID)
        );

      // TYPES
      const typeOk =
        this.tag_types.length === 0 ||
        this.tag_types.includes(r.Type);

      // COMBINAISON
      return pieceOk && styleOk && typeOk;
    });
}

  filter_by_piece(pid: number) {

    if (pid === this.activePieceId) {

      this.activePieceId = null;

    } else {

      this.activePieceId = pid;
    }

    this.applyFilters();
  }

  filter_by_style(pid: number) {

    if (pid === this.activeStyleId) {

      this.activeStyleId = null;

    } else {

      this.activeStyleId = pid;
    }

    this.applyFilters();
  }

  filter_by_type(type: string) {

    if (type === this.activetype) {

      this.activetype = null;

    } else {

      this.activetype = type;
    }

    this.applyFilters();
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
