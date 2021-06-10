import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../services/mascotas.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';
import { AvisosService } from '../services/avisos.service';
import { ServiciosService } from '../services/servicios.service';
import { Servicio } from 'src/domain/servicio';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  public authUser: any;
  servicios: Array<Servicio> = [];


  constructor(
    private router: Router,
    private alertController: AlertController,
    private auth: UsuariosService,
    private avisosService: AvisosService,
    private serviciosService: ServiciosService,
    private mascotasService: MascotasService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      if (this.authUser.id){
        this.obtenerHistorialServicios();
      }
    });
  }

  async obtenerHistorialServicios(){
      try {
        this.servicios = await this.serviciosService.getHistorialServiciosUser(this.authUser.id);
        console.log(this.servicios);
      } catch (error) {
        this.toastService.presentToast('Ha ocurrido un error obteniendo historico');
      }
  }

  calificar(idServ: number){
    this.router.navigate(['home/servicios/calificar/' + idServ])
  }

  verDetalle(idServicio){
    this.router.navigate(['home/servicios/servicios-detail', idServicio]);
  }

}
