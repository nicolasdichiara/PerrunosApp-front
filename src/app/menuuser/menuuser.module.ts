import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuuserPageRoutingModule } from './menuuser-routing.module';

import { MenuuserPage } from './menuuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuuserPageRoutingModule
  ],
  declarations: [MenuuserPage]
})
export class MenuuserPageModule {}
