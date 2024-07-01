import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentionsLegalesRoutingModule } from './mentions-legales-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    MentionsLegalesRoutingModule
  ]
})
export class MentionsLegalesModule { }
