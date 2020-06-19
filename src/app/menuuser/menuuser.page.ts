import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Mascota } from 'src/domain/mascota';
import { MascotasService } from '../services/mascotas.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-menuuser',
  templateUrl: './menuuser.page.html',
  styleUrls: ['./menuuser.page.scss'],
})
export class MenuuserPage implements OnInit {

  mascotas: Array<Mascota> = [];
  public authUser: any;
  constructor(
    private auth: UsuariosService,
    private mascotasService: MascotasService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;
      if (this.authUser.id){
        try {
          this.mascotas = await this.mascotasService.getMascotasUser(this.authUser.id);
        } catch (error) {
          this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
        }
      }

    });
  }

  logout(){
    this.auth.logout();
  }

}
