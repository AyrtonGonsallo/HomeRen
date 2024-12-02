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
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-realisations-details',
  templateUrl: './realisations-details.component.html',
  styleUrl: './realisations-details.component.css',
  
})
export class RealisationsDetailsComponent {
  
  faCheck=faCheck;
  ngOnInit(): void {
    this.userService.getFrontPageByTitle("realisations-details").subscribe(
      (response) => {
        this.page_seo_details = response;
        console.log("réponse de la requette getFrontPageByTitle",this.page_seo_details);
      },
      (error) => {
        console.error('Erreur lors de la recuperation des details seo :', error);
      }
    );
    setTimeout(() => {
      this.add_meta_for_url()
    }, 2000);

    this.loadPieces()
    this.loadRealisations()
    this.loadRealisation(parseInt(this.res_id))
  }
  res_id:string =  this.route.snapshot.paramMap.get('id')??'0';
  galerie:any
  baseurl=environment.imagesUrl
  page_seo_details:any
  constructor(private metaService: Meta,private titleService: Title,private route: ActivatedRoute,private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {

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

    var maincarousel = new Splide( '#main-carousel', {
         type       : 'fade',
         heightRatio: 0.5,
         pagination : false,
         arrows     : false,
         rewind          : true,
      } );


    var thumbcarousel=
    new Splide( '#thumbnail-carousel', {
      fixedWidth  : 100,
      fixedHeight : 60,
      gap         : 10,
      rewind      : true,
      pagination  : false,
      isNavigation: true,
      breakpoints : {
        600: {
          fixedWidth : 60,
          fixedHeight: 44,
        },
      },
    } )


    // var main = new Splide( '#main-slider', {
    //   type       : 'fade',
    //   heightRatio: 0.5,
    //   pagination : false,
    //   arrows     : false,
    //   cover      : true,
    // } );
    
    // var thumbnails = new Splide( '#thumbnail-slider', {
    //   rewind          : true,
    //   fixedWidth      : 104,
    //   fixedHeight     : 58,
    //   isNavigation    : true,
    //   gap             : 10,
    //   focus           : 'center',
    //   pagination      : false,
    //   cover           : true,
    //   dragMinThreshold: {
    //     mouse: 4,
    //     touch: 10,
    //   },
    //   breakpoints : {
    //     640: {
    //       fixedWidth  : 66,
    //       fixedHeight : 38,
    //     },
    //   },
    // } );
    setTimeout(() => {
      // main.sync( thumbnails );
      // main.mount();
      // 
      // thumbnails.mount();
      maincarousel.sync( thumbcarousel );
       maincarousel.mount();
      thumbcarousel.mount();
    }, 100);
   
    
  }
  
  add_meta_for_url(){
    
        
    this.titleService.setTitle(this.page_seo_details.Content_balise_title.replace('%Titre%', this.realisation.Titre));
    this.metaService.updateTag({ 
      name: 'description',
      content: this.page_seo_details.Content_balise_description.replace('%Description%', this.realisation.Description)
    });
    this.metaService.updateTag({ 
      name: 'title',
      content: this.page_seo_details.Content_balise_title.replace('%Titre%', this.realisation.Titre)
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: this.page_seo_details.Content_balise_og_title.replace('%Titre%', this.realisation.Titre)
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: this.page_seo_details.Content_balise_og_description.replace('%Description%', this.realisation.Description)
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: this.page_seo_details.Content_balise_og_url+this.res_id
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: this.page_seo_details.Content_balise_og_type
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: this.baseurl+this.page_seo_details.Content_balise_og_image
    });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: this.page_seo_details.Content_balise_og_site_name
    });
    this.metaService.updateTag({
      name: 'robots',
      content: this.page_seo_details.Content_balise_robots
    });
    if(typeof document !== 'undefined'){
      const head = document.getElementsByTagName('head')[0];
      var element: HTMLLinkElement|null= document.querySelector(`link[rel='canonical']`) || null
      if (element==null) {
        element= document.createElement('link') as HTMLLinkElement;
        head.appendChild(element);
      }
      element.setAttribute('rel','canonical')
      element.setAttribute('href',this.page_seo_details.Href_balise_canonical+this.res_id)
    }
    
  
}
  
  }
  