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
  piece_id:string =  this.route.snapshot.paramMap.get('id')??'0';
  galerie:any
  baseurl=environment.apiUrl
  piece:any
  realisations:any
  page_seo_details:any
  constructor(private metaService: Meta,private titleService: Title,private route: ActivatedRoute,private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {

  }
 

  ngOnInit(): void {
    this.userService.getFrontPageByTitle("pieces-details").subscribe(
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
    
    this.loadPiece(parseInt(this.piece_id))
    this.load_realisations()
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
