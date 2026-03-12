import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { NzMessageService } from 'ng-zorro-antd/message';

import Splide from '@splidejs/splide';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-pieces-details',
  templateUrl: './pieces-details.component.html',
  styleUrl: './pieces-details.component.css'
})
export class PiecesDetailsComponent {
  piece_id:string =  '6';
  galerie:any
  baseurl=environment.imagesUrl
  piece:any
  realisations:any
  page_seo_details:any
  constructor(private metaService: Meta,private titleService: Title,private route: ActivatedRoute,private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {

  }
 

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.piece = data['data'].piece;
      this.piece_id = data['data'].id;
      this.page_seo_details = data['data'].seoDetails;
      this.add_meta_for_url()    
      this.load_realisations()
      this.loadPiece(parseInt(this.piece_id) )
    });
   
  }

  add_meta_for_url(){
    
        
    this.titleService.setTitle(this.page_seo_details.Content_balise_title.replace('%Titre%', this.piece.Titre));
    this.metaService.updateTag({ 
      name: 'description',
      content: this.page_seo_details.Content_balise_description.replace('%Présentation%', this.piece.Présentation)
    });
    this.metaService.updateTag({ 
      name: 'title',
      content: this.page_seo_details.Content_balise_title.replace('%Titre%', this.piece.Titre)
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: this.page_seo_details.Content_balise_og_title.replace('%Titre%', this.piece.Titre)
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: this.page_seo_details.Content_balise_og_description.replace('%Présentation%', this.piece.Présentation)
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: this.page_seo_details.Content_balise_og_url+this.piece_id
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: this.page_seo_details.Content_balise_og_type
    });
    this.metaService.updateTag({ 
      name: 'keywords',
      content: this.page_seo_details.Content_balise_keywords
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: this.baseurl+"/files/"+this.page_seo_details.Content_balise_og_image
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
      element.setAttribute('href',this.page_seo_details.Href_balise_canonical+this.piece_id)
    }
    
  
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
                this.init_splide()
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





}
