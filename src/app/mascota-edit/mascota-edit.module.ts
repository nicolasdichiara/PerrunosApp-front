import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MascotaEditPageRoutingModule } from './mascota-edit-routing.module';

import { MascotaEditPage } from './mascota-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MascotaEditPageRoutingModule
  ],
  declarations: [MascotaEditPage]
})
export class MascotaEditPageModule {}
