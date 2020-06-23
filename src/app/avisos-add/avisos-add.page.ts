import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { MascotasService } from '../services/mascotas.service';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import { Aviso } from 'src/domain/aviso';
import { Mascota } from 'src/domain/mascota';
import { AvisosService } from '../services/avisos.service';

@Component({
  selector: 'app-avisos-add',
  templateUrl: './avisos-add.page.html',
  styleUrls: ['./avisos-add.page.scss'],
})
export class AvisosAddPage implements OnInit {

  public authUser: any;
  today: any;
  aviso: Aviso;
  mascotas: Array<Mascota> = [];
  fechaParticular = '1'; // fijo hasta que se implemente recurrencia y dias semana
  tipos: Array<{id: number, nombre: string}> = [{id: 4, nombre: 'Paseo'}, {id: 5, nombre: 'Guarderia'}];


  get tipoServicio() {
    return this.avisoForm.get('tipoServicio');
  }

  get detalle() {
    return this.avisoForm.get('detalle');
  }

  get perro() {
    return this.avisoForm.get('perro');
  }

  get horario() {
    return this.avisoForm.get('horario');
  }

  get fecha() {
    return this.avisoForm.get('fecha');
  }

  public errorMessages = {
    detalle: [
      { type: 'required', message: 'detalle es requerido'},
      { type: 'maxlength', message: 'detalle no puede ser mayor que 50 caracteres'},
    ],
    tipoServicio: [
      { type: 'required', message: 'tipoServicio es requerido'},
    ],
    horario: [
      { type: 'required', message: 'horario es requerido'},
    ],
    perro: [
      { type: 'required', message: 'perro es requerido'},
    ],
    fecha: [
      { type: 'required', message: 'Fecha es requerido'},
    ]
  };

  avisoForm = this.formBuilder.group({
    detalle: ['', [Validators.required, Validators.maxLength(50)]],
    tipoServicio: ['', [Validators.required]],
    perro: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    horario: ['', [Validators.required]],
  });
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private mascotasService: MascotasService,
    private avisosService: AvisosService,
    private auth: UsuariosService,
    private toastService: ToastService
  ) {
    this.today = new Date().toISOString();
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;
      if (this.authUser.id){
        if (this.authUser.tipoPerfil == 'Paseador') {
          this.toastService.presentToast('Momentaneamente los paseadores no pueden generar avisos');
          this.router.navigate(['home']);
        }
        try {
          this.mascotas = await this.mascotasService.getMascotasUser(this.authUser.id);
        } catch (error) {
          this.toastService.presentToast('No se han podido cargar sus mascotas, reintente.' + error);
        }
      }

    });
  }

  public async submit(){
    console.log(this.avisoForm.value);
    this.aviso = new Aviso();
    this.aviso.detalle = this.avisoForm.get('detalle').value;
    this.aviso.idPerro = this.avisoForm.get('perro').value;
    this.aviso.tipoServicio = this.avisoForm.get('tipoServicio').value;
    this.aviso.fecha = this.avisoForm.get('fecha').value;
    this.aviso.horario = this.avisoForm.get('horario').value;
    this.aviso.fechaParticular = this.fechaParticular; // fixed por funcionalidad unica por el momento

    try {
      await this.avisosService.postAviso(this.aviso, this.authUser.id);
      this.router.navigate(['home/avisos']);
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error creando el aviso, reintente.');
      console.log('Ha ocurrido un error creando el aviso, reintente.', error);
    }

  }

  ngOnInit() {
  }
}
