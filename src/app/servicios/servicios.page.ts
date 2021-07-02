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
import { LoadingService } from '../services/loading.service';

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
    private toastService: ToastService,
    public loading: LoadingService
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

  async finalizarServicio(idServicio, idPrestador, index){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confimación',
      message: 'Desea finalizar el servicio?',
      inputs: [
        {
          name: 'token',
          type: 'text',
          placeholder: 'Token Prestador'
        }
      ],
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
          handler: async (values) => {
            console.log('Confirmado');
            try {
              this.loading.present();
              await this.auth.getTokenPrestador(idPrestador).then((tok) => {
                console.log(tok)
                console.log('Token obtenido')
                if(tok.token == values.token){
                  console.log('FINALIZA SERVICIO!')
                  this.serviciosService.finalizarServicio(idServicio).then(() => {
                    this.servicios.splice(index, 1);
                    this.toastService.presentToast('Servicio Finalizado');
                    this.loading.dismiss();
                    this.router.navigate(['home/servicios/calificar/' + idServicio ]);
                  })
                  .catch(() => { this.toastService.presentToast('Ha ocurrido un error, reintente por favor.') });
                }else{
                  this.toastService.presentToast('El token ingresado no es correcto, Solicítelo al paseador para finalizar!');
                  this.loading.dismiss();
                  return false;
                }
              });

              //this.serviciosService.finalizarServicio(idServicio);
              //this.servicios.splice(index, 1);
              //this.toastService.presentToast('Servicio Finalizado');
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
