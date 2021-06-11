import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aviso } from 'src/domain/aviso';
import { TipoServicio } from 'src/domain/tipoServicio';
import { Zona } from 'src/domain/zona';
import { AvisosService } from '../services/avisos.service';
import { ToastService } from '../services/toast.service';
import { UsuariosService } from '../services/usuarios.service';
import { ZonasService } from '../services/zonas.service';

@Component({
  selector: 'app-aviso-edit',
  templateUrl: './aviso-edit.page.html',
  styleUrls: ['./aviso-edit.page.scss'],
})
export class AvisoEditPage implements OnInit {

  public authUser: any;
  today: any;
  aviso: Aviso
  tipos: Array<TipoServicio> = [];
  zonas: Array<Zona> = [];
  zonasFiltradas: Array<Zona> = []
  idAviso: number

  get tipoServicio() {
    return this.avisoForm.get('tipoServicio');
  }

  get detalle() {
    return this.avisoForm.get('detalle');
  }

  get horario() {
    return this.avisoForm.get('horario');
  }

  get precio() {
    return this.avisoForm.get('precio');
  }

  get zona() {
    return this.avisoForm.get('zona')
  }

  get filtroZonas() {
    return this.avisoForm.get('filtroZonas')
  }

  get lunes() {
    return this.avisoForm.get('lunes')
  }

  get martes() {
    return this.avisoForm.get('martes')
  }

  get miercoles() {
    return this.avisoForm.get('miercoles')
  }

  get jueves() {
    return this.avisoForm.get('jueves')
  }

  get viernes() {
    return this.avisoForm.get('viernes')
  }

  get sabado() {
    return this.avisoForm.get('sabado')
  }

  get domingo() {
    return this.avisoForm.get('domingo')
  }

  public errorMessages = {
    detalle: [
      { type: 'required', message: 'detalle es requerido' },
      { type: 'maxlength', message: 'detalle no puede ser mayor que 512 caracteres' },
    ],
    tipoServicio: [
      { type: 'required', message: 'tipoServicio es requerido' },
    ],
    zona: [
      { type: 'required', message: 'zona es requerido' },
    ],
    horario: [
      { type: 'required', message: 'horario es requerido' },
    ],
    precio: [
      { type: 'required', message: 'Precio es requerido' },
    ]
  };

  avisoForm = this.formBuilder.group({
    detalle: ['', [Validators.required, Validators.maxLength(512)]],
    tipoServicio: ['', [Validators.required]],
    zona: ['', [Validators.required]],
    horario: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    filtroZonas: ['', []],
    lunes: ['', []],
    martes: ['', []],
    miercoles: ['', []],
    jueves: ['', []],
    viernes: ['', []],
    sabado: ['', []],
    domingo: ['', []],
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private avisosService: AvisosService,
    private auth: UsuariosService,
    private toastService: ToastService,
    private zonasService: ZonasService
  ) {
    this.today = new Date().toISOString();
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;
    });
  }

  public filtrarZonas() {
    console.log(this.avisoForm.get('filtroZonas').value)
    this.zonasFiltradas = this.zonas.filter(z => z.nombreZona.toLowerCase().includes(this.avisoForm.get('filtroZonas').value.toLowerCase()))
    console.log(this.zonasFiltradas)
  }

  public async submit() {
    //this.aviso = new Aviso();
    this.aviso.tipoServicio = this.avisoForm.get('tipoServicio').value;
    this.aviso.detalle = this.avisoForm.get('detalle').value;
    this.aviso.horario = this.avisoForm.get('horario').value;
    this.aviso.precio = this.avisoForm.get('precio').value;
    this.aviso.zona = this.avisoForm.get('zona').value;
    // this.aviso.lunes = !!this.avisoForm.get('lunes').value;
    // this.aviso.martes = !!this.avisoForm.get('martes').value;
    // this.aviso.miercoles = !!this.avisoForm.get('miercoles').value;
    // this.aviso.jueves = !!this.avisoForm.get('jueves').value;
    // this.aviso.viernes = !!this.avisoForm.get('viernes').value;
    // this.aviso.sabado = !!this.avisoForm.get('sabado').value;
    // this.aviso.domingo = !!this.avisoForm.get('domingo').value;
    this.aviso.tipoPerfil = null
    this.aviso.fechaPublicacion = null

    try {
      await this.avisosService.editarAviso(this.aviso, this.idAviso);
      this.router.navigate(['home/avisos']);
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error editando el aviso, reintente.');
      console.log('Ha ocurrido un error editando el aviso, reintente.', error);
    }

  }

  async ngOnInit() {
    this.tipos = await this.auth.getTiposDeServicioDelUsuario(this.authUser.id);
    console.log(this.tipos)
    this.zonas = await this.zonasService.getTodasLasZonas()
    this.route.params.subscribe(async params => {
      this.idAviso = params['id'];  //toma la id del url del navegador 
      if (this.idAviso) {  //esto busca los datos actuales de la mascota que lo va a editar y lo guarda en mascota
        try {
          this.aviso = await this.avisosService.getAvisoById(this.idAviso);
          console.log(this.aviso);
        } catch (error) {
          this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
        }
      }
    });
  }

}
