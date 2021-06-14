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
  razasFiltradas: Array<Raza> = []
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

  get imagen() {
    return this.registrationForm.get('imagen');
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

  public filtrarRazas(){
    this.razasFiltradas = this.razas.filter(r=>r.nombre.toLowerCase().includes(this.registrationForm.get('filtroRazas').value.toLowerCase()))
  }

  public async submit(){    //se ejecuta cuando apretas editar
    console.log(this.registrationForm.value);
    this.mascota.nombre = this.registrationForm.get('nombre').value;
    this.mascota.raza = this.registrationForm.get('raza').value;
    this.mascota.fechaNacimiento = this.registrationForm.get('fechaNacimiento').value;
    this.mascota.enfermedadesPrevias = this.registrationForm.get('enfermedadesPrevias').value;
    this.mascota.descripcion = this.registrationForm.get('descripcion').value;
    this.mascota.cuidadosEspeciales = this.registrationForm.get('cuidadosEspeciales').value;
    this.mascota.sexo = this.registrationForm.get('sexo').value

    try {
      await this.mascotasService.updateMascota(this.mascota, this.mascota.idPerro);
      this.router.navigate(['home']);
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
    }

  }

  async ngOnInit() {  //cuando tenes que carga la vista se carga
    try {   //busca las razas en el back y las guarda en this. razas
      this.razas = (await this.mascotasService.getTodasLasRazas()).sort((a,b) =>  (a.nombre > b.nombre ? 1 : -1))
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
    }
    this.route.params.subscribe(async params => {
      this.idMascota = params['id'];  //toma la id del url del navegador 
      if (this.idMascota){  //esto busca los datos actuales de la mascota que lo va a editar y lo guarda en mascota
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

  subirImagen(idMascota){
    this.router.navigate(['/home/subir-imagen-mascota', idMascota]);
  }

  tieneImagen(){
    return !!this.mascota.imagen
  }

  muestraImagen(){
    if(this.mascota?.imagen==null){
      return "../../assets/img/" + this.mascota?.raza.nombre + ".jpg"
    }else {
      return this.mascota?.imagen
    }
  }

}
