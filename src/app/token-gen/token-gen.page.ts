import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/domain/usuario';
import { LoadingService } from '../services/loading.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-token-gen',
  templateUrl: './token-gen.page.html',
  styleUrls: ['./token-gen.page.scss'],
})
export class TokenGenPage implements OnInit {

  public tokenPrestador: any;
  public authUser: any;
  constructor(private _authService: UsuariosService,
    public loading: LoadingService) {}

  ngOnInit() {
    this._authService.userData$.subscribe((res: any) => {
      this.authUser = res;
      console.log(res);
      this.updateToken(res)
    });

  }

  async updateToken(user: Usuario){
    this.loading.present();
    const token = Math.random().toString(36).substring(7).toUpperCase();
    console.log(token);

    await this._authService.setTokenPrestador(user.id, token)
    .then( async res => {
      await this._authService.getTokenPrestador(user.id).then((tok) => {
        this.tokenPrestador = tok;
        console.log(this.tokenPrestador)
        console.log('Token actualizado')
        this.loading.dismiss();
      });
    })
    .catch(err => console.log('Error actualizando token'));

  }

}
