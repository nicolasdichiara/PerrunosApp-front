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
export class AvisosService {

  constructor(
    private http: HttpClient,
    private auth: UsuariosService,
    private httpService: HttpService
  ) { }


  async postAviso(aviso: Aviso, idUser) {
    console.log(aviso.toJSON());
    return this.http.post(environment.apiUrl + 'usuario/avisos/crearAviso/' + idUser, aviso.toJSON()).toPromise();
  }

  async getAvisosUser(idUser) {
    const avisos: Aviso[] = await this.http.get<any>(environment.apiUrl + 'usuario/avisos/' + idUser).toPromise();
    return avisos.map((aviso) => Aviso.fromJson(aviso));
  }

  async getAvisosActivos() {
    const avisos: Aviso[] = await this.http.get<any>(environment.apiUrl + 'avisos/traerTodosLosAvisos').toPromise();
    return avisos.map((aviso) => Aviso.fromJson(aviso));
  }

  async eliminarAviso(id: number) {
    return this.http.delete(environment.apiUrl + 'usuario/eliminarAviso/' + id).toPromise();
  }

}
