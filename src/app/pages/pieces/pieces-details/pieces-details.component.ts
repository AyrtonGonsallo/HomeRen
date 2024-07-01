import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { NzMessageService } from 'ng-zorro-antd/message';

import Splide from '@splidejs/splide';


@Component({
  selector: 'app-pieces-details',
  templateUrl: './pieces-details.component.html',
  styleUrl: './pieces-details.component.css'
})
export class PiecesDetailsComponent {
  piece_id:string =  this.route.snapshot.paramMap.get('id')??'0';
  galerie:any
  baseurl=environment.apiUrl
  piece:any
  realisations:any
  constructor(private route: ActivatedRoute,private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {

  }
 

  ngOnInit(): void {
    this.loadPiece(parseInt(this.piece_id))
    this.load_realisations()

    
  }

  loadPiece(id:number): void {
    this.userService.getPiece(id).subscribe(
      (response) => {
        this.piece = response;
        console.log("réponse de la requette get piece",this.piece);
        if(this.piece.GalerieID){
          this.userService.get_galerie(this.piece.GalerieID).subscribe(
            (response2) => {
              this.galerie = response2;
              console.log("réponse de la requette get galerie",this.galerie);
              setTimeout(() => {
                //this.init_splide()
              }, 100); 
            },
            (error) => {
              console.error('Erreur lors de la recuperation de la galerie :', error);
            }
          );
        }
        
      },
      (error) => {
        console.error('Erreur lors de la recuperation des realisation :', error);
      }
    );
  }
load_realisations(){
  
  this.userService.getRealisationsByPiece(parseInt(this.piece_id)).subscribe(
    (response) => {
      this.realisations= response;
      console.log("réponse de la requette get realisations by piece",this.realisations);
      
    },
    (error) => {
      console.error('Erreur lors de la recuperation des realisation :', error);
    }
  );
}
  
init_splide() {
  var splide = new Splide('.splide', {
    perPage : 3,
    cover   : true,
    height  : '10rem',
    lazyLoad: 'nearby',
    breakpoints: {
      800: {
        perPage: 2, 
        height : 'auto',
      },
      497: {
        perPage: 1, 
        height : 'auto',
      }
    },
  });

  splide.mount();
}
}
