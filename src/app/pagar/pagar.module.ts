import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagarPageRoutingModule } from './pagar-routing.module';
import { IonicStripeCheckoutModule } from '@vyconsulting/ionic-stripe-checkout';
import { PagarPage } from './pagar.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PagarPageRoutingModule,
    IonicStripeCheckoutModule,
  ],
  declarations: [PagarPage]
})
export class PagarPageModule {}
