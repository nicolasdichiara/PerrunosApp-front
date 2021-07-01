import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/domain/usuario';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-token-gen',
  templateUrl: './token-gen.page.html',
  styleUrls: ['./token-gen.page.scss'],
})
export class TokenGenPage implements OnInit {

  public authUser: any;
  constructor(private _authService: UsuariosService) {}

  ngOnInit() {
    this._authService.userData$.subscribe((res: any) => {
      this.authUser = res;
      console.log(res);
      this.updateToken(res)
    });

  }

  updateToken(user: Usuario){
    this._authService.getUserById(user.id)
    .then(user => {
      this.authUser = user
      console.log('Usuario actualizado')
    })
    .catch(err => console.log('Error actualizando usuario loggeado'));
  }

}
