import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../services/mascotas.service';
import { ToastService } from '../services/toast.service';
import { Mascota } from 'src/domain/mascota';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.page.html',
  styleUrls: ['./mascotas.page.scss'],
})
export class MascotasPage implements OnInit {

  public authUser: any;
  mascotas: Array<Mascota> = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private auth: UsuariosService,
    private mascotasService: MascotasService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      if (this.authUser.id){
        this.obtenerMascotas();
      }
    });
  }

  verDetalle(idMascota){
    this.router.navigate(['home/mascota-detail', idMascota]);
  }

  async eliminar(idMascota){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confimación',
      message: 'Desea eliminar esta mascota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Sí',
          handler: () => {
            console.log('Confirmado');
            this.mascotasService.eliminarMascota(idMascota);
            this.obtenerMascotas();
          }
        }
      ]
    });

    await alert.present();
  }

  async obtenerMascotas(){
    try {
      this.mascotas = await this.mascotasService.getMascotasUser(this.authUser.id);
      console.log(this.mascotas);
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
    }
  }

}
