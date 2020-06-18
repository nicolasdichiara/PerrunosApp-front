import { Injectable } from '@angular/core';
import { Mascota } from 'src/domain/mascota';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Raza } from 'src/domain/raza';
import { HttpService } from './http.service';
import { UsuariosService } from './usuarios.service';


@Injectable({
  providedIn: 'root'
})

export class MascotasService {

  public authUser: any;

  constructor(
    private http: HttpClient,
    private auth: UsuariosService,
    private httpService: HttpService
    ) {
      this.auth.userData$.subscribe((res: any) => {
        this.authUser = res;
      });
    }

  async getTodasLasRazas() {
    const razas: Raza[] = await this.http.get<any>(environment.apiUrl + 'razas').toPromise();
    return razas.map((raza) => Raza.fromJson(raza));
  }

  async postMascota(mascota: Mascota) {
    console.log(mascota.toJSON());
    return this.http.post(environment.apiUrl + 'perros/crearPerro/' + this.authUser.id, mascota.toJSON()).toPromise();
  }

  async getMascotas(user) {
    const mascotas: Mascota[] = await this.http.get<any>(environment.apiUrl + '/usuario/perros/' + user).toPromise();
    return mascotas.map((mascota) => Mascota.fromJson(mascota));
  }
/*
  async getMascotaById(id: number) {
    const mascota = await this.http.get<Mascota>(environment.apiUrl + 'razas/' + id).toPromise();
    return Mascota.fromJson(mascota);
  }

  async actualizarMascota(tarea: Mascota) {
    return this.http.put(REST_SERVER_URL + '/tareas/' + tarea.id, tarea.toJSON()).toPromise();
  }
*/

}

/*
export class StubMascotasService {
  mascotas = [
      new Mascota(1, 'Max', '', 'Descrip', '', new Date(2014, 2 , 2), 1, 1, 1, 0),
  ];

  async todasLasMascotas() {
      return this.mascotas;
  }

  async getMascotaById(id: number) {
      return this.mascotas.find((mascota) => mascota.id === id);
  }

  actualizarMascota(mascota: Mascota) { }
}
*/
