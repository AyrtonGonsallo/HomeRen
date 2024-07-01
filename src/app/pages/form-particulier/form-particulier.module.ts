import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormParticulierRoutingModule } from './form-particulier-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,SharedModule,
    FormParticulierRoutingModule
  ]
})
export class FormParticulierModule { }
