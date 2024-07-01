import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiConceptsEtTravauxService } from './services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'HomeRen';
  currentUrl: string ='';
  
  constructor(private route: ActivatedRoute,private router: Router,private userService: ApiConceptsEtTravauxService) {
  }

  ngOnInit() {
    
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
    console.log(this.currentUrl)
    this.loadPieces()

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