import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MascotaEditPageRoutingModule } from './mascota-edit-routing.module';

import { MascotaEditPage } from './mascota-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MascotaEditPageRoutingModule
  ],
  declarations: [MascotaEditPage]
})
export class MascotaEditPageModule {}
