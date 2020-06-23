import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Mascota } from 'src/domain/mascota';
import { ToastService } from '../services/toast.service';
import { MascotasService } from '../services/mascotas.service';
import { Raza } from 'src/domain/raza';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mascota-edit',
  templateUrl: './mascota-edit.page.html',
  styleUrls: ['./mascota-edit.page.scss'],
})
export class MascotaEditPage implements OnInit {

  idMascota: number;
  public authUser: any;
  today: any;
  mascota: Mascota;
  edad = 0;
  razas: Array<Raza> = [];

  get nombre() {
    return this.registrationForm.get('nombre');
  }

  get raza() {
    return this.registrationForm.get('raza');
  }

  get descripcion() {
    return this.registrationForm.get('descripcion');
  }

  get cuidadosEsp() {
    return this.registrationForm.get('cuidadosEsp');
  }

  get enfermedadesPrev() {
    return this.registrationForm.get('enfermedadesPrev');
  }

  get fechaNacimiento() {
    return this.registrationForm.get('fechaNacimiento');
  }

  get desparasitado() {
    return this.registrationForm.get('desparasitado');
  }

  get paseoAlgunaVez() {
    return this.registrationForm.get('paseoAlgunaVez');
  }

  get paseoConUnPaseador() {
    return this.registrationForm.get('paseoConUnPaseador');
  }

  get paseaFrecuente() {
    return this.registrationForm.get('paseaFrecuente');
  }

  get paseoConOtrosPerros() {
    return this.registrationForm.get('paseoConOtrosPerros');
  }

  public errorMessages = {
    nombre: [
      { type: 'required', message: 'Nombre es requerido'},
      { type: 'maxlength', message: 'Nombre no puede ser mayor que 50 caracteres'},
    ],
    raza: [
      { type: 'required', message: 'Raza es requerido'},
    ],
    descripcion: [
      { type: 'required', message: 'descripcion es requerido'},
      { type: 'maxlength', message: 'descripcion no puede ser mayor que 100 caracteres'},
    ],
    cuidadosEsp: [
      { type: 'maxlength', message: 'Cuidados Esp no puede ser mayor que 100 caracteres'},
    ],
    enfermedadesPrev: [
      { type: 'maxlength', message: 'Enfermedades Previas no puede ser mayor que 100 caracteres'},
    ],
    fechaNacimiento: [
      { type: 'required', message: 'Fecha de nacimiento es requerido'},
    ],
    desparasitado: [
      { type: 'required', message: 'desparasitado es requerido'},
    ],
    paseoAlgunaVez: [
      { type: 'required', message: 'paseoAlgunaVez es requerido'},
    ],
    paseoConUnPaseador: [
      { type: 'required', message: 'paseoConUnPaseador es requerido'},
    ],
    paseaFrecuente: [
      { type: 'required', message: 'paseaFrecuente es requerido'},
    ],
    paseoConOtrosPerros: [
      { type: 'required', message: 'paseoConOtrosPerros es requerido'},
    ]
  };

  registrationForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    raza: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.maxLength(100)]],
    cuidadosEsp: ['', [Validators.maxLength(100)]],
    enfermedadesPrev: ['', [Validators.maxLength(100)]],
    fechaNacimiento: ['', [Validators.required]],
    desparasitado: ['', [Validators.required]],
    paseoAlgunaVez: ['', [Validators.required]],
    paseoConUnPaseador: ['', [Validators.required]],
    paseoConOtrosPerros: ['', [Validators.required]],
    paseaFrecuente: ['', [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private mascotasService: MascotasService,
    private auth: UsuariosService,
    private toastService: ToastService) {
    this.today = new Date().toISOString();
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      console.log(res);
    });
  }

  public async submit(){
    console.log(this.registrationForm.value);
    //this.mascota = new Mascota();
    this.mascota.nombre = this.registrationForm.get('nombre').value;
    this.mascota.raza = this.registrationForm.get('raza').value;
    this.mascota.descripcion = this.registrationForm.get('descripcion').value;
    this.mascota.cuidadosEspeciales = this.registrationForm.get('cuidadosEspeciales').value;
    this.mascota.enfermedadesPrevias = this.registrationForm.get('enfermedadesPrevias').value;
    this.mascota.fechaNacimiento = this.registrationForm.get('fechaNacimiento').value;
    this.mascota.desparasitado = this.registrationForm.get('desparasitado').value;
    this.mascota.paseoAlgunaVez = this.registrationForm.get('paseoAlgunaVez').value;
    this.mascota.paseaFrecuente = this.registrationForm.get('paseaFrecuente').value;
    this.mascota.paseoConUnPaseador = this.registrationForm.get('paseoConUnPaseador').value;
    this.mascota.paseoConOtrosPerros = this.registrationForm.get('paseoConOtrosPerros').value;
    this.mascota.imagen = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
    // this.registrationForm.get('imagen').value;
    this.mascota.imagenLibretaVacunacion = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
    // this.registrationForm.get('imagenLibretaVacunacion').value;
    try {
      await this.mascotasService.updateMascota(this.mascota, this.mascota.idPerro);
      this.router.navigate(['home']);
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
    }

  }

  async ngOnInit() {
    try {
      this.razas = await this.mascotasService.getTodasLasRazas();
      console.log(this.razas);
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
    }
    this.route.params.subscribe(async params => {
      this.idMascota = params['id'];
      if (this.idMascota){
        try {
          this.mascota = await this.mascotasService.getMascotaById(this.idMascota);
          console.log(this.mascota);
        } catch (error) {
          this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
        }
      }
    });
  }

  calcEdad(){
    let today: any = new Date();
    let selectedDate: any = new Date(this.registrationForm.get('fechaNacimiento').value);

    let edad = Math.round((Math.abs(selectedDate - today) / (24 * 60 * 60 * 1000)) / 365);

    this.edad = edad;
  }

}
