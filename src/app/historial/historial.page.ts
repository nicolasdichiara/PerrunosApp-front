import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from 'src/domain/servicio';
import { ServiciosService } from '../services/servicios.service';
import { ToastService } from '../services/toast.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  public authUser: any;
  servicios: Array<Servicio> = [];
  serviciosFiltrados: Array<Servicio> = [];
  fechaDesde: Date
  fechaHasta: Date

  constructor(
    private router: Router,
    private auth: UsuariosService,
    private serviciosService: ServiciosService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      if (this.authUser.id) {
        this.obtenerHistorialServicios();
      }
    });
  }

  async obtenerHistorialServicios() {
    try {
      this.servicios = await this.serviciosService.getHistorialServiciosUser(this.authUser.id);
      this.serviciosFiltrados = this.servicios
      console.log(this.servicios);
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error obteniendo historico');
    }
  }

  habilitaCalificar(servicio: Servicio){
    if(this.authUser.id == servicio.idPrestador){
      return servicio.calificacionDuenio != null
    }else{
      return servicio.calificacionPrestador != null
    }
  }

  calificar(idServ: number) {
    this.router.navigate(['home/servicios/calificar/' + idServ])
  }

  verDetalle(idServicio) {
    this.router.navigate(['home/servicios/servicios-detail', idServicio]);
  }

  filtrar() {
    if (!!this.fechaDesde && !!this.fechaHasta) {
      this.serviciosFiltrados = this.servicios.filter(serv => this.parseDate(serv.fechaRealizacion) >= new Date(this.fechaDesde) && this.parseDate(serv.fechaRealizacion) <= new Date(this.fechaHasta))
    } else {
      if (!!this.fechaDesde) {
        this.serviciosFiltrados = this.servicios.filter(serv => this.parseDate(serv.fechaRealizacion) >= new Date(this.fechaDesde))
      } else {
        if(!!this.fechaHasta){
          this.serviciosFiltrados = this.servicios.filter(serv => this.parseDate(serv.fechaRealizacion) <= new Date(this.fechaHasta))
        }
      }
    }
  }

  parseDate(unaFechaJSON) {
    //return new Date(unaFechaJSON.year, unaFechaJSON.monthValue, unaFechaJSON.dayOfMonth)
    return new Date(unaFechaJSON.year, unaFechaJSON.monthValue - 1, unaFechaJSON.dayOfMonth, 23, 59, 59, 59)
  }

}
