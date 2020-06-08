import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MascotaAddPageRoutingModule } from './mascota-add-routing.module';

import { MascotaAddPage } from './mascota-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MascotaAddPageRoutingModule
  ],
  declarations: [MascotaAddPage]
})
export class MascotaAddPageModule {}
