import { Component, SimpleChanges } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { Realisation } from '../../../Models/Realisation';
import { Piece } from '../../../Models/Piece';
import { environment } from '../../../environments/environment';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Splide from '@splidejs/splide';
@Component({
  selector: 'app-realisations-details',
  templateUrl: './realisations-details.component.html',
  styleUrl: './realisations-details.component.css',
  
})
export class RealisationsDetailsComponent {
  faCheck=faCheck;
  ngOnInit(): void {
    this.loadPieces()
    this.loadRealisations()
    this.loadRealisation(parseInt(this.res_id))
  }
  res_id:string =  this.route.snapshot.paramMap.get('id')??'0';
  galerie:any
  baseurl=environment.apiUrl
  constructor(private route: ActivatedRoute,private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {

  }
  loadPieces(): void {
    this.userService.getPieces().subscribe(
      (response: Piece[]) => {
        this.pieces = response;
        console.log("réponse de la requette getPieces",this.pieces);
      },
      (error: any) => {
        console.error('Erreur lors de la recuperation des pieces :', error);
      }
    );
  }
  pieces: Piece[] = [];
  realisations: Realisation[] = [];

  realisation: any ;
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

  loadRealisation(id:number): void {
    this.userService.getRealisation(id).subscribe(
      (response) => {
        this.realisation = response;
        console.log("réponse de la requette getrealisation",this.realisation);
        this.userService.get_galerie(this.realisation.GalerieID).subscribe(
          (response2) => {
            this.galerie = response2;
            console.log("réponse de la requette get galerie",this.galerie);
            if (typeof document !== 'undefined') {
              this.init_splide();
            }
          },
          (error) => {
            console.error('Erreur lors de la recuperation de la galerie :', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la recuperation des realisation :', error);
      }
    );
  }

 
  
  init_splide() {
    console.log("splide initialisé")

    var main = new Splide( '#main-slider', {
      type       : 'fade',
      heightRatio: 0.5,
      pagination : false,
      arrows     : false,
      cover      : true,
    } );
    
    var thumbnails = new Splide( '#thumbnail-slider', {
      rewind          : true,
      fixedWidth      : 104,
      fixedHeight     : 58,
      isNavigation    : true,
      gap             : 10,
      focus           : 'center',
      pagination      : false,
      cover           : true,
      dragMinThreshold: {
        mouse: 4,
        touch: 10,
      },
      breakpoints : {
        640: {
          fixedWidth  : 66,
          fixedHeight : 38,
        },
      },
    } );
    setTimeout(() => {
      main.sync( thumbnails );
      main.mount();
      thumbnails.mount();
    }, 100);
   
    
  }
  
 
  
  }
  