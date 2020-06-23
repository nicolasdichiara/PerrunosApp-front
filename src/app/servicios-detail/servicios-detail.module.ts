import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciosDetailPageRoutingModule } from './servicios-detail-routing.module';

import { ServiciosDetailPage } from './servicios-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosDetailPageRoutingModule
  ],
  declarations: [ServiciosDetailPage]
})
export class ServiciosDetailPageModule {}
