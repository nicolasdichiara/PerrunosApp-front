import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Raza } from 'src/domain/raza';
import { HttpService } from './http.service';
import { UsuariosService } from './usuarios.service';
import { environment } from '../../environments/environment';
import { Aviso } from 'src/domain/aviso';
import { Servicio } from 'src/domain/servicio';
import { TipoServicio } from 'src/domain/tipoServicio';

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
    console.log(JSON.stringify(postData))
    return this.http.post(environment.apiUrl + 'usuario/servicios/contratarPaseo', postData).toPromise();
  }

  async getServiciosUser(idUser) {
    const servicios: Servicio[] = await this.http.get<any>(environment.apiUrl +
       'usuario/serviciosActualesDelUsuario/' + idUser).toPromise();
    return servicios.map((servicio) => Servicio.fromJson(servicio));
  }

  async finalizarServicio(id: number) {
    return this.http.post(environment.apiUrl + 'usuario/servicios/finalizarServicio/' + id, '').toPromise();
  }

  async registrarPagoServicio(postData: any) {
    return this.http.post(environment.apiUrl + 'servicios/pagarServicio', postData).toPromise();
  }

  async getServicioById(id: number) {
    const servicio = await this.http.get<Servicio>(environment.apiUrl + 'usuario/traerUnServicio/' + id).toPromise();
    return Servicio.fromJson(servicio);
  }

  async getHistorialServiciosUser(idUser) {
    const servicios: Servicio[] = await this.http.get<any>(environment.apiUrl +
       'usuario/historialDeServicios/' + idUser).toPromise();
    return servicios.map((servicio) => Servicio.fromJson(servicio));
  }

  async getTiposDeServicios() {
    const tiposDeServicio: TipoServicio[] = await this.http.get<any>(environment.apiUrl + 'servicios/tiposDeServicio').toPromise();
    return tiposDeServicio.map((tipoServicio)=> TipoServicio.fromJson(tipoServicio));
    //return [TipoServicio.fromJson(tiposDeServicio)]
  }

  async getTipoDeServicioPorId(idTipoServicio) {
    const tiposDeServicio: TipoServicio[] = await this.http.get<any>(environment.apiUrl + 'servicios/tiposDeServicio/' + idTipoServicio).toPromise();
    //return tiposDeServicio.map((tipoServicio)=> TipoServicio.fromJson(tipoServicio));
    return TipoServicio.fromJson(tiposDeServicio)
  }

  // Pago
  async obtenerPreferenciaParaPago(postData: any) {
    postData = {
      titulo: 'Paseo',
      cantidad: 1,
      precio_unitario: 500.00
    };
    console.log(postData)
// environment.apiUrl +
    return this.http.post('https://still-ocean-56684.herokuapp.com/', postData).toPromise();
  }

  // Localizacion
  async establecerUbicacionPrestador(postData: any) {
    return this.http.post(environment.apiUrl + 'servicios/geolocalizacionPrestador', postData).toPromise();
  }

  async establecerUbicacionDuenio(postData: any) {
    return this.http.post(environment.apiUrl + 'servicios/geolocalizacionDuenio', postData).toPromise();
  }

  async getUbicacionPrestador(id) {
    return this.http.get(environment.apiUrl + 'servicios/getGPSPrestador/' + id).toPromise();
  }

  async getUbicacionDuenio(id) {
    return this.http.get(environment.apiUrl + 'servicios/getGPSDuenio/' + id).toPromise();
  }

  // Calificaciones
  async calificarServicioPrestador(postData: any) {
    return this.http.post(environment.apiUrl + 'servicios/calificarAlPrestador', postData).toPromise();
  }

  async calificarServicioDuenio(postData: any) {
    console.log(postData);
    return this.http.post(environment.apiUrl + 'servicios/calificarAlDuenio', postData).toPromise();
  }

}
