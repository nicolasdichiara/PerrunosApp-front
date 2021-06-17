import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PromocionesService } from '../services/promociones.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-promocion-agregar',
  templateUrl: './promocion-agregar.page.html',
  styleUrls: ['./promocion-agregar.page.scss'],
})
export class PromocionAgregarPage implements OnInit {

  public authUser: any;

  get imagen() {
    return this.promocionForm.get('imagen');
  }

  get descripcion() {
    return this.promocionForm.get('descripcion');
  }

  public errorMessages = {
    descripcion: [
      { type: 'required', message: 'Descripcion es requerido' },
      { type: 'maxlength', message: 'Descripcion no puede ser mayor que 250 caracteres' },
    ],
    imagen: [
      { type: 'required', message: 'tipoServicio es requerido' },
    ]
  };

  promocionForm = this.formBuilder.group({
    descripcion: ['', [Validators.required, Validators.maxLength(250)]],
    imagen: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private promocionesService: PromocionesService,
    private auth: UsuariosService,
    private toastService: ToastService) { }

  ngOnInit() {
  }

  submit() {

  }

}
