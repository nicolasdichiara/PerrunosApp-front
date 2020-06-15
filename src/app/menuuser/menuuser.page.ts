import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-menuuser',
  templateUrl: './menuuser.page.html',
  styleUrls: ['./menuuser.page.scss'],
})
export class MenuuserPage implements OnInit {

  public authUser: any;
  constructor(private auth: UsuariosService) { }

  ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
    });
  }

  logout(){
    this.auth.logout();
  }

}
