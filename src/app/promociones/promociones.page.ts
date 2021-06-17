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

}
