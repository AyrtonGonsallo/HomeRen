import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { IndexComponent } from './index/index.component';
import { QuestionComponent } from './question/question.component';


@NgModule({
  declarations: [
    IndexComponent,
    QuestionComponent
  ],
  imports: [
    CommonModule,
    FaqRoutingModule
  ]
})
export class FaqModule { }
