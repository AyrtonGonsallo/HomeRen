import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuiSommeNousRoutingModule } from './qui-somme-nous-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    QuiSommeNousRoutingModule
  ]
})
export class QuiSommeNousModule { }
