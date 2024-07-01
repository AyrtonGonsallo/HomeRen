import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormArtisanRoutingModule } from './form-artisan-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,SharedModule,
    FormArtisanRoutingModule
  ]
})
export class FormArtisanModule { }
