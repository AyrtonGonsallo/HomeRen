import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuiSommeNousRoutingModule } from './qui-somme-nous-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,FontAwesomeModule ,
    QuiSommeNousRoutingModule
  ]
})
export class QuiSommeNousModule { }
