import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promocion } from 'src/domain/promocion';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) { }

  async getTodasLasPromociones() {
    const perfiles: Promocion[] = await this.http.get<any>(environment.apiUrl + 'promociones/getTodasLasPromociones').toPromise();
    return perfiles.map((promocion)=> Promocion.fromJson(promocion));
  }

  async postPromocion(promocion: Promocion) {
    console.log(promocion.toJSON());
    return this.http.post(environment.apiUrl + 'promociones/crearPromocion', promocion.toJSON()).toPromise();
  }

  async getPromocionById(id: number) {
    const promocion = await this.http.get<Promocion>(environment.apiUrl + 'promociones/getPromocion/' + id).toPromise();
    return Promocion.fromJson(promocion);
  }

  async updatePromocion(promocion: Promocion) {
    console.log(promocion.toJSON());
    return this.http.post(environment.apiUrl + 'promociones/updatePromocion', promocion.toJSON()).toPromise();
  }
}
