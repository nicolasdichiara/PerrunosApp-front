import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagarPageRoutingModule } from './pagar-routing.module';
import { PagarPage } from './pagar.page';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PagarPageRoutingModule,
  ],
  declarations: [PagarPage]
})
export class PagarPageModule {}
