import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilEditPageRoutingModule } from './perfil-edit-routing.module';

import { PerfilEditPage } from './perfil-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PerfilEditPageRoutingModule
  ],
  declarations: [PerfilEditPage]
})
export class PerfilEditPageModule {}
