import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromocionAgregarPageRoutingModule } from './promocion-agregar-routing.module';

import { PromocionAgregarPage } from './promocion-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PromocionAgregarPageRoutingModule
  ],
  declarations: [PromocionAgregarPage]
})
export class PromocionAgregarPageModule {}
