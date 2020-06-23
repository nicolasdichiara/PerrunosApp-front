import { Component, OnInit } from '@angular/core';
import {Usuario} from 'src/domain/usuario';
import { UsuariosService } from '../services/usuarios.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public authUser: any;

  constructor(
    private auth: UsuariosService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;
      if (this.authUser.id){
       
      }

    });
  }

}
