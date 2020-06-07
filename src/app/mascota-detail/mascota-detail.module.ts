import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MascotaDetailPageRoutingModule } from './mascota-detail-routing.module';

import { MascotaDetailPage } from './mascota-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MascotaDetailPageRoutingModule
  ],
  declarations: [MascotaDetailPage]
})
export class MascotaDetailPageModule {}
