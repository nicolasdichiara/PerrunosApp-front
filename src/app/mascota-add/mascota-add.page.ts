import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Mascota } from 'src/domain/mascota';
import { ToastService } from '../services/toast.service';
import { MascotasService } from '../services/mascotas.service';
import { Raza } from 'src/domain/raza';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-mascota-add',
  templateUrl: './mascota-add.page.html',
  styleUrls: ['./mascota-add.page.scss'],
})
export class MascotaAddPage implements OnInit {

  public authUser: any;
  today: any;
  mascota: Mascota;
  edad = 0;
  razas: Array<Raza> = [];
  razasFiltradas: Array<Raza> = []
  desparasitado: boolean
  paseoAlgunaVez: boolean
  paseoConUnPaseador: boolean
  paseoConOtrosPerros: boolean
  paseaFrecuente: boolean
  vacunaDeLaRabia: boolean
  vacunaSextuple: boolean
  sexosDisponibles: Array<any> = [{"nombreSexo":"Macho"},{"nombreSexo":"Hembra"}]

  get nombre() {
    return this.registrationForm.get('nombre');
  }

  get raza() {
    return this.registrationForm.get('raza');
  }

  get descripcion() {
    return this.registrationForm.get('descripcion');
  }

  get cuidadosEspeciales() {
    return this.registrationForm.get('cuidadosEspeciales');
  }

  get enfermedadesPrevias() {
    return this.registrationForm.get('enfermedadesPrevias');
  }

  get fechaNacimiento() {
    return this.registrationForm.get('fechaNacimiento');
  }

  get filtroRazas(){
    return this.registrationForm.get('filtroRazas')
  }

  get sexo(){
    return this.registrationForm.get('sexo')
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
    cuidadosEspeciales: [
      { type: 'maxlength', message: 'Cuidados Esp no puede ser mayor que 100 caracteres'},
    ],
    enfermedadesPrevias: [
      { type: 'maxlength', message: 'Enfermedades Previas no puede ser mayor que 100 caracteres'},
    ],
    fechaNacimiento: [
      { type: 'required', message: 'Fecha de nacimiento es requerido'},
    ],
    sexo: [
      { type: 'required', message: 'Sexo es requerido'},
    ]
  };

  registrationForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    raza: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.maxLength(100)]],
    cuidadosEspeciales: ['', [Validators.maxLength(100)]],
    enfermedadesPrevias: ['', [Validators.maxLength(100)]],
    fechaNacimiento: ['', [Validators.required]],
    filtroRazas: ['',[]],
    sexo: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private mascotasService: MascotasService,
    private auth: UsuariosService,
    private toastService: ToastService,
    public loading: LoadingService) {
    this.today = new Date().toISOString();
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      console.log(res);
    });
  }

  public filtrarRazas(){
    this.razasFiltradas = this.razas.filter(r=>r.nombre.toLowerCase().includes(this.registrationForm.get('filtroRazas').value.toLowerCase()))
  }

  public async submit(){
    console.log(this.registrationForm.value);
    this.mascota = new Mascota();
    this.mascota.nombre = this.registrationForm.get('nombre').value;
    this.mascota.raza = this.registrationForm.get('raza').value;
    this.mascota.descripcion = this.registrationForm.get('descripcion').value;
    this.mascota.cuidadosEspeciales = this.registrationForm.get('cuidadosEspeciales').value;
    this.mascota.enfermedadesPrevias = this.registrationForm.get('enfermedadesPrevias').value;
    this.mascota.fechaNacimiento = this.registrationForm.get('fechaNacimiento').value;
    this.mascota.desparasitado = this.desparasitado;
    this.mascota.paseoAlgunaVez = this.paseoAlgunaVez;
    this.mascota.paseaFrecuente = this.paseaFrecuente;
    this.mascota.paseoConUnPaseador = this.paseoConUnPaseador;
    this.mascota.paseoConOtrosPerros = this.paseoConOtrosPerros;
    this.mascota.imagen = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
    this.mascota.imagenLibretaVacunacion = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
    this.mascota.sexo = this.registrationForm.get('sexo').value
    this.mascota.vacunaDeLaRabia = this.vacunaDeLaRabia
    this.mascota.vacunaSextuple = this.vacunaSextuple
    this.loading.present()
    try {
      await this.mascotasService.postMascota(this.mascota, this.authUser.id);
      this.router.navigate(['home']);
      this.loading.dismiss()
    } catch (error) {
      this.loading.dismiss()
      this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
    }

  }

  async ngOnInit() {
    try {
      this.razas = (await this.mascotasService.getTodasLasRazas()).sort((a,b) =>  (a.nombre > b.nombre ? 1 : -1))
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
    }
  }

  calcEdad(){
    let today: any = new Date();
    let selectedDate: any = new Date(this.registrationForm.get('fechaNacimiento').value);

    let edad = Math.round((Math.abs(selectedDate - today) / (24 * 60 * 60 * 1000)) / 365);

    this.edad = edad;
  }

}
