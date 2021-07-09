import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { ToastService } from '../services/toast.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServiciosService } from '../services/servicios.service';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.page.html',
  styleUrls: ['./perfil-edit.page.scss'],
})
export class PerfilEditPage implements OnInit {
  public authUser: any;
  nombreEdit: string;
  apellidoEdit: string;
  apodoEdit: string;
  fechaNacimientoEdit: Date;
  dniEdit: string;
  direccionEdit: string;
  telefonoEdit: string;
  cbuEdit: string
  today: any;
  edad = 0;

  postData = {
    // nombre: '',
    // apellido: '',
    apodo: '',
    fechaNacimiento: '',
    dni: '',
    telefono: '',
    direccion: '',
    cbu: ''
  };

  // get nombre() {
  //   return this.registrationForm.get('nombre');
  // }

  // get apellido() {
  //   return this.registrationForm.get('apellido');
  // }

  get apodo() {
    return this.registrationForm.get('apodo');
  }

  get fechaNacimiento() {
    return this.registrationForm.get('fechaNacimiento');
  }

  get dni() {
    return this.registrationForm.get('dni');
  }

  get telefono() {
    return this.registrationForm.get('telefono');
  }

  get direccion() {
    return this.registrationForm.get('direccion');
  }

  get cbu() {
    return this.registrationForm.get('cbu');
  }

  public errorMessages = {
    // nombre: [
    //   { type: 'required', message: 'Nombre es requerido' },
    //   { type: 'maxlength', message: 'Nombre no puede ser mayor que 50 caracteres' },
    // ],
    // apellido: [
    //   { type: 'required', message: 'Apellido es requerido' },
    //   { type: 'maxlength', message: 'Apellido no puede ser mayor que 50 caracteres' },
    // ],
    apodo: [
      { type: 'required', message: 'Apodo es requerido' },
      { type: 'maxlength', message: 'Apodo no puede ser mayor que 50 caracteres' },
    ],
    fechaNacimiento: [
      { type: 'required', message: 'Fecha de nacimiento es requerido' },
    ],
    dni: [
      { type: 'required', message: 'DNI es requerido' },
      { type: 'maxlength', message: 'DNI no puede ser mayor que 11 caracteres' },
    ],
    telefono: [
      { type: 'required', message: 'Teléfono es requerido' },
      { type: 'maxlength', message: 'Teléfono no puede ser mayor que 50 caracteres' },
    ],
    direccion: [
      { type: 'required', message: 'direccion es requerido' },
      { type: 'maxlength', message: 'direccion no puede ser mayor que 50 caracteres' },
    ],
    cbu: [
      { type: 'maxlength', message: 'cbu no puede ser mayor que 22 caracteres' },
    ]
  };

  registrationForm = this.formBuilder.group({
    // nombre: ['', [Validators.required, Validators.maxLength(50)]],
    // apellido: ['', [Validators.required, Validators.maxLength(50)]],
    apodo: ['', [Validators.required, Validators.maxLength(50)]],
    fechaNacimiento: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.maxLength(11)]],
    telefono: ['', [Validators.required, Validators.maxLength(50)]],
    direccion: ['', [Validators.required, Validators.maxLength(50)]],
    cbu: ['', [Validators.maxLength(22)]]
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: UsuariosService,
    private toastService: ToastService,
    private alertController: AlertController,
    private serviciosService: ServiciosService
  ) {
    this.today = new Date().toISOString();
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;
      if (this.authUser.id) {
        // this.nombreEdit = this.authUser.nombre
        // this.apellidoEdit = this.authUser.apellido
        this.apodoEdit = this.authUser.apodo
        this.fechaNacimientoEdit = this.authUser.fechaNacimiento
        this.dniEdit = this.authUser.dni
        this.telefonoEdit = this.authUser.telefono
        this.direccionEdit = this.authUser.direccion
        this.cbuEdit = this.authUser.cbu
      }
    });
  }

  parseTipoPerfil(valor: string) {
    if (valor == "Duenio") {
      return "Dueño De Mascota"
    } else {
      return valor
    }
  }

  public async submit() {
    const fecha = new Date(this.registrationForm.get('fechaNacimiento').value)
    console.log(this.registrationForm.value);
    //this.postData.nombre = this.registrationForm.get('nombre').value;
    //this.postData.apellido = this.registrationForm.get('apellido').value;
    this.postData.apodo = this.registrationForm.get('apodo').value;
    this.postData.fechaNacimiento = this.dosDigitosDia(fecha) + '/' +this.dosDigitosMes(fecha) + '/' + fecha.getFullYear()
    this.postData.dni = this.registrationForm.get('dni').value;
    this.postData.telefono = this.registrationForm.get('telefono').value;
    this.postData.direccion = this.registrationForm.get('direccion').value;
    this.postData.cbu = this.registrationForm.get('cbu').value;
    try {
      await this.auth.editProfile(this.postData, this.authUser.id);
      this.router.navigate(['/home/menuuser']);
      this.toastService.presentToast('Perfil Modificado Correctamente!');
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error modificando el perfil, reintente.');
    }
  }

  dosDigitosMes(fecha: Date) {
    return ('0' + (fecha.getMonth() + 1)).slice(-2);
  }

  dosDigitosDia(fecha: Date) {
    return ('0' + fecha.getDate()).slice(-2);
  }

  calcEdad() {
    let today: any = new Date();
    let selectedDate: any = new Date(this.registrationForm.get('fechaNacimiento').value);

    let edad = Math.round((Math.abs(selectedDate - today) / (24 * 60 * 60 * 1000)) / 365);

    this.edad = edad;
  }

  logout(){
    this.auth.logout();
  }

  async desactivarPerfil(){
    const serviciosActivos = await this.serviciosService.getServiciosUser(this.authUser.id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confimación',
      message: 'Desea eliminar su perfil? No debe tener servicios activos',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Sí',
          handler: () => {
            console.log('Confirmado');
            if(serviciosActivos.length==0){
              this.auth.desactivarPerfil(this.authUser.id)
              this.logout()
            } else {
              this.toastService.presentToast("No puede eliminar su perfil porque tiene servicios activos")
              this.router.navigate(['home'])
            }
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;
      if (this.authUser.id) {
        // this.nombreEdit = this.authUser.nombre
        // this.apellidoEdit = this.authUser.apellido
        this.apodoEdit = this.authUser.apodo
        this.fechaNacimientoEdit = this.authUser.fechaNacimiento
        this.dniEdit = this.authUser.dni
        this.telefonoEdit = this.authUser.telefono
        this.direccionEdit = this.authUser.direccion
        this.cbuEdit = this.authUser.cbu
      }
    });
  }

}
