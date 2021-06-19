import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PromocionesService } from '../services/promociones.service';
import { UsuariosService } from '../services/usuarios.service';
import { Promocion } from 'src/domain/promocion';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
})
export class PromocionesPage implements OnInit {

  public authUser: any;
  promociones: Array<Promocion>

  constructor(
    private router: Router,
    private promocionesService: PromocionesService,
    private auth: UsuariosService,
    private toastService: ToastService) { }

  async ngOnInit() {
    this.promociones = await this.promocionesService.getTodasLasPromociones()
    console.log(this.promociones)
  }

  verDetalle(idPromocion){
    this.router.navigate(['home/promociones/promocion-detail', idPromocion]);
  }

  editar(idPromocion){
    this.router.navigate(['home/promociones/promocion-edit', idPromocion]);
  }

  activarPromo(idPromocion){
    try{
      this.promocionesService.activarPromocion(idPromocion)
      this.promociones.find(promo => promo.idPromocion == idPromocion).activa = "true"
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
    }
  }

  desactivarPromo(idPromocion){
    try{
      this.promocionesService.desactivarPromocion(idPromocion)
      this.promociones.find(promo => promo.idPromocion == idPromocion).activa = null
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
    }
  }

}
