import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DevisEnLigneRoutingModule } from './devis-en-ligne-routing.module';
import { IndexComponent } from './index/index.component';
import { IconModule } from '@ant-design/icons-angular';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,SharedModule,
    DevisEnLigneRoutingModule,IconModule,
  ]
})
export class DevisEnLigneModule { }
