import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { ToastService } from '../services/toast.service';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  postData = {
    username: '',
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

  login(){

    try {
      alert('login correcto ');
      this.authService.loguear();
      this.navigate();
    } catch (error) {
      console.log(error);
    }
  }

  validateInputs() {
    console.log(this.postData);
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();
    return (
    this.postData.username &&
    this.postData.password &&
    username.length > 0 &&
    password.length > 0
    );
  }

    loginAction() {
      if (this.validateInputs()) {
        this.authService.login(this.postData).subscribe(
        (res: any) => {
        if (res.userData) {
        console.log(res);
        // Storing the User data.
        this.authService.loguear();
        this.storageService.store(AuthConstants.AUTH, res.userData);
        this.router.navigate(['home']);
        } else {
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
