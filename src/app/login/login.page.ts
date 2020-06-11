import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";

  constructor(private loginService: UsuariosService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    const {username, password} = this;

    try {
      alert('login correcto ' + username);
      this.loginService.loguear();
      alert(this.loginService.isLoggedIn());
      this.navigate();
    } catch (error) {
      console.log(error);
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

}
