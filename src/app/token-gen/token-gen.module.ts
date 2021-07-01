import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokenGenPageRoutingModule } from './token-gen-routing.module';

import { TokenGenPage } from './token-gen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TokenGenPageRoutingModule
  ],
  declarations: [TokenGenPage]
})
export class TokenGenPageModule {}
