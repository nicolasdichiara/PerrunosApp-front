import { Injectable } from '@angular/core';
import { Mascota } from 'src/domain/mascota';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Raza } from 'src/domain/raza';
import { HttpService } from './http.service';
import { UsuariosService } from './usuarios.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})

export class MascotasService {
  userData$ = new BehaviorSubject<any>([]);


  constructor(
    private http: HttpClient,
    private auth: UsuariosService,
    private httpService: HttpService
    ) {
    }

  async getTodasLasRazas() {
    const razas: Raza[] = await this.http.get<any>(environment.apiUrl + 'razas').toPromise();
    return razas.map((raza) => Raza.fromJson(raza));
  }

  async postMascota(mascota: Mascota, idUser) {
    console.log(mascota.toJSON());
    return this.http.post(environment.apiUrl + 'perros/crearPerro/' + idUser, mascota.toJSON()).toPromise();
  }

  async updateMascota(mascota: Mascota, idMascota) {
    console.log(mascota.toJSON());
    return this.http.post(environment.apiUrl + 'perros/modificarPerro/' + idMascota, mascota.toJSON()).toPromise();
  }

  async getMascotasUser(idUser) {
    const mascotas: Mascota[] = await this.http.get<any>(environment.apiUrl + 'usuario/perros/' + idUser).toPromise();
    return mascotas.map((mascota) => Mascota.fromJson(mascota));
  }

  async getMascotaById(id: number) {
    const mascota = await this.http.get<Mascota>(environment.apiUrl + 'perros/' + id).toPromise();
    return Mascota.fromJson(mascota);
  }

  async eliminarMascota(id: number) {
    return this.http.delete(environment.apiUrl + 'perros/deshabilitarPerro/' + id).toPromise();
  }

  subirImagenMascota(postData: any, idMascota: number) {
    // return this.httpService.post('usuario/createDuenio', postData);
    //lo mismo que en el back
    let imagenjson = {
      imagen:postData
    }
    console.log("aca")
    console.log(imagenjson)
    return this.http.post(environment.apiUrl + 'perros/cargarImagen/' + idMascota, imagenjson).toPromise();
  }

/*

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
