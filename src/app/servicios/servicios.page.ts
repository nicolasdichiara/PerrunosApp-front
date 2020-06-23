import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../services/mascotas.service';
import { ToastService } from '../services/toast.service';
import { Mascota } from 'src/domain/mascota';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';
import { Aviso } from 'src/domain/aviso';
import { AvisosService } from '../services/avisos.service';
import { ServiciosService } from '../services/servicios.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  public authUser: any;
  avisos: Array<Aviso> = [];


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
        this.obtenerServicios();
      }
    });
  }

  async obtenerServicios(){
      try {
        this.avisos = await this.avisosService.getAvisosUser(this.authUser.id);
        console.log(this.avisos);
      } catch (error) {
        this.toastService.presentToast('Ha ocurrido un error obteniendo avisos' + error);
      }
  }

}
