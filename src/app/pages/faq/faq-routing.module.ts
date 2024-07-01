import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '../faq/index/index.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
    {path:'',component:IndexComponent},
    {path:'question/:id',component:QuestionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
