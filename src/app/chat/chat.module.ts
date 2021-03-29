import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { ChatPage } from './chat.page';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {
    withCredentials: true
} };


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [ChatPage]
})
export class ChatPageModule {}
