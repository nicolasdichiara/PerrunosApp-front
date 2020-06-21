import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisosAddPageRoutingModule } from './avisos-add-routing.module';

import { AvisosAddPage } from './avisos-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisosAddPageRoutingModule
  ],
  declarations: [AvisosAddPage]
})
export class AvisosAddPageModule {}
