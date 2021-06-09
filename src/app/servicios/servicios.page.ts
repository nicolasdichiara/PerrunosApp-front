import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../services/mascotas.service';
import { ToastService } from '../services/toast.service';
import { Mascota } from 'src/domain/mascota';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';
import { AvisosService } from '../services/avisos.service';
import { ServiciosService } from '../services/servicios.service';
import { Servicio } from 'src/domain/servicio';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  public authUser: any;
  servicios: Array<Servicio> = [];


  constructor(
    private router: Router,
    private alertController: AlertController,
    private auth: UsuariosService,
    private serviciosService: ServiciosService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      if (this.authUser.id){
        this.obtenerServicios();
      }
    });
  }

  async obtenerServicios(){
      try {
        this.servicios = await this.serviciosService.getServiciosUser(this.authUser.id);
        console.log(this.servicios);
      } catch (error) {
        this.toastService.presentToast('Ha ocurrido un error obteniendo servicios');
      }
  }

  async finalizarServicio(idServicio, index){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confimación',
      message: 'Desea finalizar el servicio?',
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
            try {
              this.serviciosService.finalizarServicio(idServicio);
              this.servicios.splice(index, 1);
              this.toastService.presentToast('Servicio Finalizado');
              this.router.navigate(['home/servicios/calificar/' + idServicio ]);
            }
            catch (error) {
              this.toastService.presentToast('Ha ocurrido un error, reintente.');
            }

          }
        }
      ]
    });

    await alert.present();

  }

  verDetalle(idServicio){
    this.router.navigate(['home/servicios/servicios-detail', idServicio]);
  }

}
