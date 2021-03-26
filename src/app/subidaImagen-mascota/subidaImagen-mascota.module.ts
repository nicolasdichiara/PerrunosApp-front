import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SubidaImagenMascotaPage } from './subidaImagenMascota.page';

import { SubidaImagenMascotaPageRoutingModule } from './subidaImagenMascota-routing.module';
import { FileSizeFormatPipeMascota } from './file-size-format.pipe';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubidaImagenMascotaPageRoutingModule
  ],
  declarations: [SubidaImagenMascotaPage, FileSizeFormatPipeMascota]
})
export class SubidaImagenPageModule { }
