import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/domain/servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotasService } from '../services/mascotas.service';
import { ToastService } from '../services/toast.service';
import { ServiciosService } from '../services/servicios.service';
import { Mascota } from 'src/domain/mascota';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-servicios-detail',
  templateUrl: './servicios-detail.page.html',
  styleUrls: ['./servicios-detail.page.scss'],
})
export class ServiciosDetailPage implements OnInit {

  idServicio: number;
  servicio: Servicio;
  mascota: Mascota;
  public authUser: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mascotasService: MascotasService,
    private alertController: AlertController,
    private serviciosService: ServiciosService,
    private toastService: ToastService,
    private auth: UsuariosService
  ) {
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.idServicio = params['id'];
      if (this.idServicio) {
        try {
          this.servicio = await this.serviciosService.getServicioById(this.idServicio);
          console.log(this.servicio);
          // if (this.servicio.idPerro){
          //   try {
          //     this.mascota = await this.mascotasService.getMascotaById(this.servicio.idPerro);
          //     console.log(this.mascota);
          //   } catch (error) {
          //     this.toastService.presentToast('Ha ocurrido un error al mostrar mascota');
          //   }
          // }
        } catch (error) {
          this.toastService.presentToast('Ha ocurrido un error, reintente.');
        }
      }
    });
  }

  rutaWhatsapp(){
    if(this.authUser.tipoPerfil == 'Duenio'){
      return "https://api.whatsapp.com/send?phone=+54" + this.servicio.telefonoPrestador
    } else {
      return "https://api.whatsapp.com/send?phone=+54" + this.servicio.telefonoDuenio
    }
  }

  contactarContraparte(){
    window.location.href = this.rutaWhatsapp() 
  }

  puedoVerMapa(){
    return !!this.servicio?.activo
  }

  verMapa() {
    this.router.navigate(['home/geolocalizacion', this.servicio.idServicio]);
  }

  pagarParaFinalizar(idServicio: number){
    this.router.navigate(['home/avisos/pagar/' + idServicio ]);
  }
/*
  async finalizarServicio(idServicio) {
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
              this.toastService.presentToast('Servicio Finalizado');
              this.router.navigate(['home/servicios/calificar/' + idServicio]);
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
*/
}
