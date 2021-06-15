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

  async getTodosLosReportes() {
    const reportes: Reporte[] = await this.http.get<any>(environment.apiUrl + 'reportes').toPromise();
    return reportes.map((reporte)=> Reporte.fromJson(reporte));
  }

  async getReporteById(id: number) {
    const reporte = await this.http.get<Reporte>(environment.apiUrl + 'reporte/' + id).toPromise();
    return Reporte.fromJson(reporte);
  }

}
