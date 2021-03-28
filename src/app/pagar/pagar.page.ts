import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';
import { AvisosService } from '../services/avisos.service';
import { ServiciosService } from '../services/servicios.service';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ICreatePaymentCharge } from '@vyconsulting/ionic-stripe-checkout/lib/models/ipayment-charge';
import { HttpErrorResponse } from '@angular/common/http';

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
 
  constructor(
    private router: Router,
    private alertController: AlertController,
    private auth: UsuariosService,
    private avisosService: AvisosService,
    private serviciosService: ServiciosService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.obtenerPreferencia();
    /*
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      if (this.authUser.id){
        this.obtenerPreferencia();
      }
    });

    */
  }

  async obtenerPreferencia(){
    /*
    try {
      this.preferencia = await this.serviciosService.obtenerPreferenciaParaPago(1);
      this.preferencia = this.preferencia.preferencia;
      console.log(this.preferencia.preferencia);
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error obteniendo datos para pago');
      console.log(error);
    }
    */
  }

  onPay(e){


    console.log(e)
    console.log(e.error)
    this.toastService.presentToast(e.error.error.message)

  }

}
