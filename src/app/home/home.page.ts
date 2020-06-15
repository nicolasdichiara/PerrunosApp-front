import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public authUser: any;
  constructor(private auth: UsuariosService) {}

  ngOnInit() {
    // this.auth.getUserData();
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      console.log(res);
    });
  }

  logout(){
    this.auth.logout();
  }
}
