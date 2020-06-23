import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Raza } from 'src/domain/raza';
import { HttpService } from './http.service';
import { UsuariosService } from './usuarios.service';
import { environment } from '../../environments/environment';
import { Aviso } from 'src/domain/aviso';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(
    private http: HttpClient,
    private auth: UsuariosService,
    private httpService: HttpService
  ) { }


  async contratarServicio(postData: any) {
    return this.http.post(environment.apiUrl + 'usuario/servicios/contratarPaseo', postData).toPromise();
  }

}
