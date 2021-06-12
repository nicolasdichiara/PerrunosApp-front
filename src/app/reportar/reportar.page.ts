import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Aviso } from 'src/domain/aviso';
import { Reporte } from 'src/domain/reporte';
import { AvisosService } from '../services/avisos.service';
import { ReportesService } from '../services/reportes.service';
import { ToastService } from '../services/toast.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.page.html',
  styleUrls: ['./reportar.page.scss'],
})
export class ReportarPage implements OnInit {

  public authUser: any
  avisos: Array<Aviso> = []
  idTipoElegido: number
  usuario: string
  detalle: string
  reporte: Reporte

  constructor(
    private router: Router,
    private alertController: AlertController,
    private auth: UsuariosService,
    //private avisosService: AvisosService,
    private toastService: ToastService,
    private reportesService: ReportesService
  ) { }

  async ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      // if (this.authUser.id) {
      //   this.obtenerAvisos();
      // }
    });
  }

  async submit() {
    this.reporte = new Reporte
    this.reporte.usuario = this.usuario
    this.reporte.detalle = this.detalle

    try {
      this.reportesService.postReporte(this.reporte, this.authUser.id)
      this.router.navigate(['/home/menuuser']);
      this.toastService.presentToast('Reporte Creado Correctamente!');
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error creando el reporte, reintente.');
      console.log('Ha ocurrido un error creando el reporte, reintente.', error);
    }
  }

  // async obtenerAvisos() {
  //   try {
  //     console.log(this.authUser.id)
  //     this.avisos = await this.avisosService.getAvisosContactados(this.authUser.id);
  //     console.log(this.avisos);
  //   } catch (error) {
  //     this.toastService.presentToast('Ha ocurrido un error obteniendo avisos' + error);
  //   }
  // }
}

