import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  message = '';
  messages = [];
  currentUser = '';
  users = '';
  selectedRoom = '';
  public authUser: any;

  constructor(
    private socket: Socket,
    private toastCtrl: ToastController,
    private auth: UsuariosService,
    private chats: ChatService
  ) { }
 
  async ngOnInit() {

    this.auth.userData$.subscribe( async (res: any) => {
      this.authUser = res;
      console.log(this.authUser)
      if(this.authUser.id != undefined){

        this.socket.connect();
  
        let name = 'user-' + this.authUser.id;
        this.currentUser = name;
        this.selectedRoom = 'room_' + this.currentUser;

        await this.chats.getMensajesRoom(this.selectedRoom).then((data)=>{
          this.messages = data;
          console.log(this.messages);
        });

        this.socket.emit('set-name', { name: name, room: null });
    
        this.socket.fromEvent('users-changed').subscribe(data => {
          let user = data['user'];
          console.log(data)
          if (data['event'] === 'left') {
            this.showToast('Usuario se ha ido: ' + user);
            console.log('Usuario se ha ido: ' + user)
          } else {
            this.showToast('Usuario se unió: ' + user);
          }
        });
    
        this.socket.fromEvent('message').subscribe(message => {
          this.messages.push(message);
          console.log(this.messages)
        });
  
        // Get room and users
        this.socket.fromEvent('roomUsers').subscribe(({ room, users, usersFull }) => {
          console.log(room)
          users.forEach(user=>{
            console.log(user)
          });
          console.log(usersFull)
          this.users = usersFull;
        });
      }
    });


  }
 
  sendMessage(room?) {
    /*
    if(room){
      this.ingresarARoom(room)
    }else {
      alert('no hay sala seleccionada, se envia msj en la propia')
    }
    */
    this.socket.emit('send-message', { room: room, text: this.message });
    this.message = '';
    console.log(this.messages);
  }
 
  async ingresarARoom(room){
    this.socket.emit('set-name', { name: this.currentUser, room: room });
    await this.chats.getMensajesRoom(room).then((data)=>{
      this.messages = data;
      console.log(this.messages);
    });
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

}
