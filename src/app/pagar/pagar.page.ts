import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AvisosService } from '../services/avisos.service';
import { ServiciosService } from '../services/servicios.service';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ICreatePaymentCharge } from '@vyconsulting/ionic-stripe-checkout/lib/models/ipayment-charge';
import { HttpErrorResponse } from '@angular/common/http';
import { TarjetaPagoModalComponent } from '../components/tarjeta-pago-modal/tarjeta-pago-modal.component';
import { Servicio } from '../../domain/servicio';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.page.html',
  styleUrls: ['./pagar.page.scss'],
})
export class PagarPage implements OnInit {

  public authUser: any;
  preferencia: any;
  checkout: EventEmitter<ICreatePaymentCharge | HttpErrorResponse>
  buttonSubscription
  idServicio: number;
  servicio: Servicio;
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private auth: UsuariosService,
    private avisosService: AvisosService,
    private serviciosService: ServiciosService,
    private modalController: ModalController,
    private toastService: ToastService,
    public loading: LoadingService) { }

  ngOnInit() {
    /*
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      if (this.authUser.id){
        this.obtenerPreferencia();
      }
    });

    */
    this.route.params.subscribe(async params => {
      this.idServicio = params['idServicio'];
      if (this.idServicio) {
        try {
          this.servicio = await this.serviciosService.getServicioById(this.idServicio);
          console.log(this.servicio);
        } catch (error) {
          this.toastService.presentToast('Ha ocurrido un error cargando servicio.');
        }
      }
    });
  }

  async pagarEfectivo(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confimación',
      message: 'Desea finalizar el servicio? Abone en efectivo y solicite al paseador su token para proceder!',
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
              await this.auth.getTokenPrestador(this.servicio.idPrestador).then((tok) => {
                console.log(tok)
                console.log('Token obtenido')
                if(tok.token == values.token){
                  console.log('FINALIZA SERVICIO!')
                  this.serviciosService.finalizarServicio(this.idServicio).then(() => {
                    this.toastService.presentToast('Servicio Finalizado');
                    this.loading.dismiss();
                    this.router.navigate(['home/servicios/calificar/' + this.idServicio ]);
                  })
                  .catch(() => { this.toastService.presentToast('Ha ocurrido un error, reintente por favor.') });
                }else{
                  this.toastService.presentToast('El token ingresado no es correcto, Solicítelo al paseador para finalizar!');
                  this.loading.dismiss();
                  return false;
                }
              });
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

  async openModalAtr(){
    const modal = await this.modalController.create({
      component: TarjetaPagoModalComponent,
      componentProps: { 
        pago: {
          idServicio: this.idServicio,
          idPrestador: this.servicio.idPrestador,
          valor: this.servicio.precio
        }
      }
    });


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confimación',
      message: 'Desea pagar y finalizar el servicio? solicite al prestador su token para proceder!',
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
              await this.auth.getTokenPrestador(this.servicio.idPrestador).then(async (tok) => {
                console.log(tok)
                console.log('Token obtenido')
                if(tok.token == values.token){
                  await modal.present();
                  this.loading.dismiss();
                }else{
                  this.toastService.presentToast('El token ingresado no es correcto, Solicítelo al paseador para finalizar!');
                  this.loading.dismiss();
                  return false;
                }
              });
            }
            catch (error) {
              this.toastService.presentToast('Ha ocurrido un error, reintente.');
            }

          }
        }
      ]
    });

    await alert.present();

    await modal.onWillDismiss().then((res) => {
      if(res.role != 'cancel'){
        console.log('Pago efectuado')
        console.log(res)
        this.serviciosService.finalizarServicio(this.idServicio).then(() => {
          this.toastService.presentToast('Servicio Finalizado');
          this.router.navigate(['home/servicios/calificar/' + this.idServicio ]);
        })
        .catch(() => { this.toastService.presentToast('Ha ocurrido un error, reintente por favor.') });
      }else{
        console.log('Pago CANCELADO')
      }
    });
  }

}
