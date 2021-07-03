import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../services/mascotas.service';
import { ToastService } from '../services/toast.service';
import { Mascota } from 'src/domain/mascota';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';
import { AvisosService } from '../services/avisos.service';
import { ServiciosService } from '../services/servicios.service';
import { Servicio } from 'src/domain/servicio';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  public authUser: any;
  servicios: Array<Servicio> = [];


  constructor(
    private router: Router,
    private alertController: AlertController,
    private auth: UsuariosService,
    private serviciosService: ServiciosService,
    private toastService: ToastService,
    public loading: LoadingService
  ) { }

  ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      if (this.authUser.id){
        this.obtenerServicios();
      }
    });
  }

  async obtenerServicios(){
      try {
        this.servicios = await this.serviciosService.getServiciosUser(this.authUser.id);
        console.log(this.servicios);
      } catch (error) {
        this.toastService.presentToast('Ha ocurrido un error obteniendo servicios');
      }
  }

  pagarParaFinalizar(idServicio: number){
    this.router.navigate(['home/avisos/pagar/' + idServicio ]);
  }

  verDetalle(idServicio){
    this.router.navigate(['home/servicios/servicios-detail', idServicio]);
  }

}
