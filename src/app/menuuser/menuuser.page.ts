import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Mascota } from 'src/domain/mascota';
import { MascotasService } from '../services/mascotas.service';
import { ToastService } from '../services/toast.service';
import { Servicio } from 'src/domain/servicio';
import { ServiciosService } from '../services/servicios.service';

@Component({
  selector: 'app-menuuser',
  templateUrl: './menuuser.page.html',
  styleUrls: ['./menuuser.page.scss'],
})
export class MenuuserPage implements OnInit {

  mascotas: Array<Mascota> = [];
  public authUser: any;
  userStats: any;
  servicios: Array<Servicio> = [];
  whatsapp: any = "https://api.whatsapp.com/send?phone=+541166899679&text=Hola"

  constructor(
    private auth: UsuariosService,
    private serviciosService: ServiciosService,
    private mascotasService: MascotasService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    /*
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;

      if (this.authUser.id){
        try {
          this.userStats = await this.auth.getUserById(this.authUser.id);
        } catch (error) {
          this.toastService.presentToast('No se ha podido actualizar calificacion');
        }
        if (this.authUser.tipoPerfil != 'Paseador'){
          try {
            this.mascotas = await this.mascotasService.getMascotasUser(this.authUser.id);
          } catch (error) {
            this.toastService.presentToast('No se han podido cargar sus mascotas, reintente.' + error);
          }
        }
      }

    });
*/
  }

  ionViewWillEnter() {
    console.log('cargando view');
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;
      console.log(this.authUser)

      if (this.authUser.id){
        try {
          this.userStats = await this.auth.getUserById(this.authUser.id);
        } catch (error) {
          this.toastService.presentToast('No se ha podido actualizar calificacion');
        }
        try {
          this.servicios = await this.serviciosService.getHistorialServiciosUser(this.authUser.id);
        } catch (error) {
          this.toastService.presentToast('No se ha podido actualizar historico');
        }
        if (this.authUser.tipoPerfil != 'Paseador'){
          try {
            this.mascotas = await this.mascotasService.getMascotasUser(this.authUser.id);
          } catch (error) {
            this.toastService.presentToast('No se han podido cargar sus mascotas, reintente.' + error);
          }
        }
      }

    });
  }

  logout(){
    this.auth.logout();
  }

}
