import { Component } from '@angular/core';
import { Question } from '../../../Models/Question';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {


  ngOnInit(): void {
    this.loadquestions()
  }


  constructor(private fb: NonNullableFormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {

  }


  questions: any[] = [];

  loadquestions(): void {
    this.userService.get_questions_par_categories().subscribe(
      (response) => {
        this.questions = response;
        console.log("réponse de la requette get questions",this.questions);
      },
      (error) => {
        console.error('Erreur lors de la recuperation des questions :', error);
      }
    );
    
  }

}
