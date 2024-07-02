import { Component } from '@angular/core';
import { ActivatedRoute, Router ,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiConceptsEtTravauxService } from './services/api-concepts-et-travaux.service';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from './environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  baseurl=environment.apiUrl
  title = 'HomeRen';
  currentUrl: string ='';
  page_seo_details:any
  constructor(   private metaService: Meta,private titleService: Title,private route: ActivatedRoute,private router: Router,private userService: ApiConceptsEtTravauxService) {
  }

  ngOnInit() {
    this.metaService.updateTag({
      name: 'robots',
      content: "noindex, nofollow"
    });
    this.router.events.subscribe((event) => {
     
      if (event instanceof NavigationEnd) {
        //var urlparts=window.location.href.split('/')
        if (typeof window !== 'undefined') {
          var urlparts = window.location.href.split('/');
          // Use urlparts in your browser-specific code
        } else {
          // Handle non-browser environment (if needed)
          var urlparts=['/',"/"];
          console.warn('Window object is not defined. Running in a non-browser environment.');
        }
        this.currentUrl=urlparts[urlparts.length-1]
        console.log("current url",this.currentUrl)
        if(document){
          this.add_meta_for_url(this.currentUrl)

        }
      }
      
    });
    
    this.loadPieces()

  }

  add_meta_for_url(Url:string){
    let title=(Url=="")?"home":Url;
    this.userService.getFrontPageByTitle(title).subscribe(
      (response) => {
        this.page_seo_details = response;
        console.log("réponse de la requette getFrontPageByTitle",this.page_seo_details);
        this.titleService.setTitle(this.page_seo_details.Content_balise_title);
        this.metaService.updateTag({ 
          name: 'description',
          content: this.page_seo_details.Content_balise_description
        });
        this.metaService.updateTag({ 
          name: 'title',
          content: this.page_seo_details.Content_balise_title
        });
        this.metaService.updateTag({
          property: 'og:title',
          content: this.page_seo_details.Content_balise_og_title
        });
        this.metaService.updateTag({
          property: 'og:description',
          content: this.page_seo_details.Content_balise_og_description
        });
        this.metaService.updateTag({
          property: 'og:url',
          content: this.page_seo_details.Content_balise_og_url
        });
        this.metaService.updateTag({
          property: 'og:type',
          content: this.page_seo_details.Content_balise_og_type
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
        if(document){
          const head = document.getElementsByTagName('head')[0];
          var element: HTMLLinkElement|null= document.querySelector(`link[rel='canonical']`) || null
          if (element==null) {
            element= document.createElement('link') as HTMLLinkElement;
            head.appendChild(element);
          }
          element.setAttribute('rel','canonical')
          element.setAttribute('href',this.page_seo_details.Href_balise_canonical)
        }
        
      },
      (error) => {
        console.error('Erreur lors de la recuperation des details seo :', error);
      }
    );
  }
    
  
  getClassForUrl(): string {
    switch (this.currentUrl) {
      case '':
        return 'home-page';
      case 'realisations':
        return 'realisations';
      case 'contact':
        return 'contact-page';
      default:
        return 'default-page';
    }
  }
  pieces: any[] = [];
  loadPieces(): void {
    this.userService.get_pieces_par_categories().subscribe(
      (response) => {
        this.pieces = response;
        console.log("réponse de la requette getPieces",this.pieces);
      },
      (error) => {
        console.error('Erreur lors de la recuperation des pieces :', error);
      }
    );
  }
}