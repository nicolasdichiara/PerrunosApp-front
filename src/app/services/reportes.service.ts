import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reporte } from 'src/domain/reporte';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) { }

  postReporte(reporte: Reporte, idUsuario: any){
    return this.http.post(environment.apiUrl + 'usuario/crearReporte/' + idUsuario, JSON.stringify(reporte)).toPromise()
  }

}
