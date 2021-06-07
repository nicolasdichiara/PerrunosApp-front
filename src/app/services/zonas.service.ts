import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Zona } from 'src/domain/zona';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) {
  }

  async getTodasLasZonas() {
    const zonas: Zona[] = await this.http.get<any>(environment.apiUrl + 'zonas').toPromise();
    return zonas.map((zona)=> Zona.fromJson(zona));
  }

}