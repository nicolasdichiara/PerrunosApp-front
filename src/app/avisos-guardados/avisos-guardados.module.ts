import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisosGuardadosPageRoutingModule } from './avisos-guardados-routing.module';

import { AvisosGuardadosPage } from './avisos-guardados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisosGuardadosPageRoutingModule
  ],
  declarations: [AvisosGuardadosPage]
})
export class AvisosGuardadosPageModule {}
