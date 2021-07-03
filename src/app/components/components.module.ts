import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TarjetaPagoModalComponent } from './tarjeta-pago-modal/tarjeta-pago-modal.component';
import { IonicStripeCheckoutModule } from '@vyconsulting/ionic-stripe-checkout';

@NgModule({
  declarations: [TarjetaPagoModalComponent],
  exports: [TarjetaPagoModalComponent],
  imports: [
    CommonModule, IonicStripeCheckoutModule, RouterModule, FormsModule, ReactiveFormsModule, IonicModule 
  ]
})
export class ComponentsModule { }
