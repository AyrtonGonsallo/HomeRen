import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  questionId:string =  this.route.snapshot.paramMap.get('id')??'0';
  ngOnInit(): void {
    this.getQuestionDetails(this.questionId)
  }


  constructor(private route:ActivatedRoute,private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {

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


}
