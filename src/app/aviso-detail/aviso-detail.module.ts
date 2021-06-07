import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisoDetailPageRoutingModule } from './aviso-detail-routing.module';

import { AvisoDetailPage } from './aviso-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisoDetailPageRoutingModule
  ],
  declarations: [AvisoDetailPage]
})
export class AvisoDetailPageModule {}
