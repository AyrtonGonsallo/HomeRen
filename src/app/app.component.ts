import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router ,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { faLocationDot,faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ApiConceptsEtTravauxService } from './services/api-concepts-et-travaux.service';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { ShoppingCartService } from './services/shopping-cart.service';
import { AuthServiceService } from './services/auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  faLocationDot=faLocationDot;
  faCartShopping=faCartShopping;
  baseurl=environment.apiUrl
  title = 'HomeRen';
  currentUrl: string ='';
  page_seo_details:any
  constructor(private panier:ShoppingCartService, private authService:AuthServiceService,  private metaService: Meta,private titleService: Title,private route: ActivatedRoute,private router: Router,private userService: ApiConceptsEtTravauxService) {
  }

  logout(){
    this.authService.logout()
  }
isconnected=false
  ngOnInit() {
    this.authService.getIsConnected().subscribe((isConnected) => {
      this.isconnected = isConnected;
      console.log('L\'utilisateur est connecté :', this.isconnected);
    });
    console.log(this.isconnected)
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
          let eeurl=event.urlAfterRedirects.split('/').pop();
          if(eeurl!=undefined)
            {
              this.currentUrl = eeurl;
            }
          
            console.log("current url", this.currentUrl);
            
            // Handle non-browser environment (if needed)
            var urlparts=[this.currentUrl];
            console.warn('Window object is not defined. Running in a non-browser environment.');
        }
        
        this.currentUrl=urlparts[urlparts.length-1]
        let is_number=this.isNumber(this.currentUrl)
        console.log("current url",this.currentUrl)
        console.log("current url is number : ",is_number)
        if(!is_number){
          let title=(this.currentUrl=="")?"home":this.currentUrl;
          this.userService.getFrontPageByTitle(title).subscribe(
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
        }
          

        
      }
      
    });
    
    this.loadPieces()

  }

  get_total_panier(){
    return this.panier.getItemCount()
  }
  
  isNumber(value: string): boolean {
    const numberRegex = /^-?\d+(\.\d+)?$/;
    return numberRegex.test(value);
  }


  add_meta_for_url(){
    
        
        this.titleService.setTitle(this.page_seo_details.Content_balise_title);
        this.metaService.updateTag({ 
          name: 'description',
          content: this.page_seo_details.Content_balise_description
        });
        this.metaService.updateTag({ 
          name: 'keywords',
          content: this.page_seo_details.Content_balise_keywords
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
        if(typeof document !== 'undefined'){
          const head = document.getElementsByTagName('head')[0];
          var element: HTMLLinkElement|null= document.querySelector(`link[rel='canonical']`) || null
          if (element==null) {
            element= document.createElement('link') as HTMLLinkElement;
            head.appendChild(element);
          }
          element.setAttribute('rel','canonical')
          element.setAttribute('href',this.page_seo_details.Href_balise_canonical)
        }
        
      
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