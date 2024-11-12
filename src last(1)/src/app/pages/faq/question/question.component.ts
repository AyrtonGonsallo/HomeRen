import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  questionId:string =  this.route.snapshot.paramMap.get('id')??'0';
  
  ngOnInit(): void {
    this.getQuestionDetails(this.questionId)
    this.userService.getFrontPageByTitle("question").subscribe(
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
  baseurl=environment.apiUrl
  page_seo_details:any
  constructor(private metaService: Meta,private titleService: Title,private route:ActivatedRoute,private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {

  }
question:any

  

// Méthode pour récupérer les détails de l'utilisateur à partir de l'API
getQuestionDetails(id: string): void {
  this.userService.get_question( parseInt(id, 10)).subscribe(
    (response) => {
      console.log("réponse de la requette get question details",response);
     this.question=response
      
     
      
    },
    (error) => {
      console.error('Erreur lors de la recuperation des details question :', error);
    }
  );
  
}


add_meta_for_url(){
    
        
  this.titleService.setTitle(this.page_seo_details.Content_balise_title.replace('%Question%', this.question.Question));
  this.metaService.updateTag({ 
    name: 'description',
    content: this.page_seo_details.Content_balise_description.replace('%Titre%', this.question.Titre)
  });
  this.metaService.updateTag({ 
    name: 'keywords',
    content: this.page_seo_details.Content_balise_keywords
  });
  this.metaService.updateTag({ 
    name: 'title',
    content: this.page_seo_details.Content_balise_title.replace('%Question%', this.question.Question)
  });
  this.metaService.updateTag({
    property: 'og:title',
    content: this.page_seo_details.Content_balise_og_title.replace('%Question%', this.question.Question)
  });
  this.metaService.updateTag({
    property: 'og:description',
    content: this.page_seo_details.Content_balise_og_description.replace('%Titre%', this.question.Titre)
  });
  this.metaService.updateTag({
    property: 'og:url',
    content: this.page_seo_details.Content_balise_og_url+this.questionId
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
    element.setAttribute('href',this.page_seo_details.Href_balise_canonical+this.questionId)
  }
  

}

}
