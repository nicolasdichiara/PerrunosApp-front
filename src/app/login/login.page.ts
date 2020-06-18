import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { ToastService } from '../services/toast.service';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';
import { Usuario } from 'src/domain/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  postData = {
    usuario: '',
    password: ''
    };

    constructor(
      private router: Router,
      private authService: UsuariosService,
      private storageService: StorageService,
      private toastService: ToastService
    ) {}

  ngOnInit() {
  }

  validateInputs() {
    console.log(this.postData);
    let usuario = this.postData.usuario.trim();
    let password = this.postData.password.trim();
    return (
    this.postData.usuario &&
    this.postData.password &&
    usuario.length > 0 &&
    password.length > 0
    );
  }

    loginAction() {
      if (this.validateInputs()) {
        this.authService.login(this.postData).subscribe(
          (res: any) => {
            if (res.dni) {
              console.log(res);
              const u: Usuario = Usuario.fromJson(res);
              console.log(u);
              // Storing the User data.
              this.storageService.store(AuthConstants.AUTH, u);
              this.router.navigate(['home']);
            } else {
              console.log(res);
              this.toastService.presentToast('Usuario y contraseña incorrectos.');
            }
          },
          (error: any) => {
            this.toastService.presentToast('Problemas de red.');
          }
        );
      } else {
        this.toastService.presentToast(
        'Por favor ingrese usuario y contraseña.'
        );
      }
    }
  /*
  logIn(username: string, password: string, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    // Calls service to login user to the api rest
    // data,err,end
    this.loginService.login(username, password).subscribe(

      res => {
        console.log(res);
        const u: SuperIndividuo = SuperIndividuo.fromJson(res);
        this.loginService.setUserLoggedIn(u);
      },
      error => {
        console.error(error);
      },
//usar localstorage para almacenar datos de session
//desp llenar los gestores-component con datos del superIndiv loggeado, lo mismo con equipos 
      () => this.navigate()
    );

  }*/

  navigate() {
    this.router.navigateByUrl('/home');
  }

  registrarse() {
    this.router.navigateByUrl('/register');
  }

}
