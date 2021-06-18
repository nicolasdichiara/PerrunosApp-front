import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Promocion } from 'src/domain/promocion';
import { PromocionesService } from '../services/promociones.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-promocion-detail',
  templateUrl: './promocion-detail.page.html',
  styleUrls: ['./promocion-detail.page.scss'],
})
export class PromocionDetailPage implements OnInit {

  idPromocion: number;
  promocion: Promocion;

  constructor(
    private route: ActivatedRoute,
    private promocionesService: PromocionesService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.idPromocion = params['id'];
      if (this.idPromocion){
        try {
          this.promocion = await this.promocionesService.getPromocionById(this.idPromocion);
          console.log(this.promocion);
        } catch (error) {
          this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
        }
      }
    });
  }

  parseTrue(valor: Boolean){
    if(valor){
      return "Si"
    }else{
      return "No"
    }
  }

}
