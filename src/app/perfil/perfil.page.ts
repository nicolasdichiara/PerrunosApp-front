import { Component, OnInit } from '@angular/core';
import {Usuario} from 'src/domain/usuario';
import { UsuariosService } from '../services/usuarios.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public authUser: any;
  userStats: any;

  constructor(
    private auth: UsuariosService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;
      if (this.authUser.id){
       
      }

    });
  }

  async ionViewWillEnter() {
    try {
      this.userStats = await this.auth.getUserById(this.authUser.id);
    } catch (error) {
      this.toastService.presentToast('No se ha podido actualizar calificacion');
    }
  }

  parseTipoPerfil(valor:string){
    if(valor=="Duenio"){
      return "Dueño De Mascota"
    } else {
      return valor
    }
  }

}
