import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { ICreatePaymentCharge } from '@vyconsulting/ionic-stripe-checkout/lib/models/ipayment-charge';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tarjeta-pago-modal',
  templateUrl: './tarjeta-pago-modal.component.html',
  styleUrls: ['./tarjeta-pago-modal.component.scss'],
})
export class TarjetaPagoModalComponent implements OnInit {

  @Input() pago: any;
  checkout: EventEmitter<ICreatePaymentCharge | HttpErrorResponse>
  buttonSubscription
/*
  amigosAddForm: FormGroup;

  get username() {
    return this.amigosAddForm.get('username');
  }

  public errorMessages = {
    username: [
      { type: 'required', message: 'Usuario amigo es requerido'}
    ]
  };
*/
  constructor(
    private modalCtrl: ModalController,
    private _formBuilder: FormBuilder,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  /*  this.amigosAddForm = this._formBuilder.group({
      username: ['', [Validators.required]]
    });*/
    console.log(this.pago)
  }

  async onSubmit(form: FormGroup, e: any) {
   /* e.preventDefault();
    console.log(this.amigosAddForm.getRawValue())
    await this.modalCtrl.dismiss(this.amigosAddForm.getRawValue(), 'editado');
*/
  }

  async onPay(e){
    if(e.error){
      this.toastService.presentToast(e.error.error.message)
    }else{
      console.log(e)
      await this.modalCtrl.dismiss(e, 'editado');
    }
  }

  async dismissModal() {
    await this.modalCtrl.dismiss(null, 'cancel');
  }

}
