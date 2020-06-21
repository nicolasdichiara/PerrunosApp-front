import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/domain/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  today: Date;
  postData = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    fechaAlta: '',
    };

  get email() {
    return this.registrationForm.get('email');
  }

  get nombre() {
    return this.registrationForm.get('nombre');
  }

  get apellido() {
    return this.registrationForm.get('apellido');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get tipo() {
    return this.registrationForm.get('tipo');
  }

  public errorMessages = {
    nombre: [
      { type: 'required', message: 'Nombre es requerido'},
      { type: 'maxlength', message: 'Nombre no puede ser mayor que 50 caracteres'},
    ],
    apellido: [
      { type: 'required', message: 'Nombre es requerido'},
      { type: 'maxlength', message: 'Nombre no puede ser mayor que 50 caracteres'},
    ],
    email: [
      { type: 'required', message: 'descripcion es requerido'},
    ],
    tipo: [
      { type: 'required', message: 'Tipo es requerido'},
    ],
    password: [
      { type: 'required', message: 'Contraseña es requerido'},
      { type: 'minlength', message: 'Contraseña debe ser mayor a 8 caracteres'},
    ]
  };

  registrationForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    apellido: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: UsuariosService,
    private toastService: ToastService
  ) {
    this.today = new Date();
  }

  public async submit(){
    console.log(this.registrationForm.value);
    this.postData.nombre = this.registrationForm.get('nombre').value;
    this.postData.apellido = this.registrationForm.get('apellido').value;
    this.postData.email = this.registrationForm.get('email').value;
    this.postData.password = this.registrationForm.get('password').value;
    this.postData.fechaAlta = this.dosDigitosDia(this.today) + '/' + this.dosDigitosMes(this.today) + '/' + this.today.getFullYear();
    const tipo = this.registrationForm.get('tipo').value;
    try {
      if (tipo === '1'){
        console.log('entrando');
        await this.auth.signupDuenio(this.postData);
      }else{
        await this.auth.signupPaseador(this.postData);
      }
      this.router.navigate(['login']);
      this.toastService.presentToast('Registro exitoso!');
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error creando usuario, reintente.');
    }

  }

  dosDigitosMes(fecha: Date){
    return ('0' + (fecha.getMonth() + 1)).slice(-2);
  }

  dosDigitosDia(fecha: Date){
    return ('0' + fecha.getDate()).slice(-2);
  }

  ngOnInit() {
  }

}
