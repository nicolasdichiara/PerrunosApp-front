import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SubidaImagenPage } from './subidaImagen.page';

import { SubidaImagenPageRoutingModule } from './subidaImagen-routing.module';
import { FileSizeFormatPipe } from './file-size-format.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubidaImagenPageRoutingModule
  ],
  declarations: [SubidaImagenPage, FileSizeFormatPipe]
})
export class SubidaImagenPageModule { }
