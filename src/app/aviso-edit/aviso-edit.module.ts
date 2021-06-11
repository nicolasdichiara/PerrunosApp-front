import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisoEditPageRoutingModule } from './aviso-edit-routing.module';

import { AvisoEditPage } from './aviso-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AvisoEditPageRoutingModule
  ],
  declarations: [AvisoEditPage]
})
export class AvisoEditPageModule {}
