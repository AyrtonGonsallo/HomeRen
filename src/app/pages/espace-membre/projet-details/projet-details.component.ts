import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-projet-details',
  templateUrl: './projet-details.component.html',
  styleUrl: './projet-details.component.css'
})
export class ProjetDetailsComponent {
  projetId:string =  this.route.snapshot.paramMap.get('id')??'0';

  ngOnInit(): void {
      this.getprojetDetails(this.projetId)
      
  
      
    }
    baseurl=environment.apiUrl
    page_seo_details:any
    constructor(private metaService: Meta,private titleService: Title,private route:ActivatedRoute,private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {
  
    }
  projet:any
  
    
  
  // Méthode pour récupérer les détails de l'utilisateur à partir de l'API
  getprojetDetails(id: string): void {
    this.userService.get_projet( parseInt(id, 10)).subscribe(
      (response) => {
        console.log("réponse de la requette get projet details",response);
       this.projet=response
        
       
        
      },
      (error) => {
        console.error('Erreur lors de la recuperation des details projet :', error);
      }
    );
    
  }
}
