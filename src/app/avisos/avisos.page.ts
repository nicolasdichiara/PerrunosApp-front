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
import { TipoServicio } from 'src/domain/tipoServicio';
import { Zona } from 'src/domain/zona';
import { ZonasService } from '../services/zonas.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.page.html',
  styleUrls: ['./avisos.page.scss'],
})
export class AvisosPage implements OnInit {

  public authUser: any;
  avisos: Array<Aviso> = [];
  avisosActivos: Array<Aviso> = [];
  msg: number;
  tipos: Array<TipoServicio> = [];
  zonas: Array<Zona> = [];
  zonasFiltradas: Array<Zona> = []
  zonaEscrita: string = ""
  zonaElegida: number
  idTipoElegido: number
  avisosActivosFiltrados: Array<Aviso> = []

  constructor(
    private router: Router,
    private alertController: AlertController,
    private auth: UsuariosService,
    private avisosService: AvisosService,
    private serviciosService: ServiciosService,
    private toastService: ToastService,
    private zonasService: ZonasService,
  ) { this.msg = 0; }

  async ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      if (this.authUser.id) {
        this.obtenerAvisos();
        if (this.authUser.tipoPerfil == 'Duenio') {
          this.obtenerAvisosActivos();
        }
      }
    });
    this.tipos = await this.serviciosService.getTiposDeServicios();
    console.log(this.tipos)
    this.zonas = await this.zonasService.getTodasLasZonas()
  }

  async obtenerAvisos() {
    console.log(this.authUser.tipoPerfil);
    if (this.authUser.tipoPerfil !== 'Duenio') {
      try {
        this.avisos = await this.avisosService.getAvisosUser(this.authUser.id);
        console.log(this.avisos);
      } catch (error) {
        this.toastService.presentToast('Ha ocurrido un error obteniendo avisos' + error);
      }
    } else {
      this.msg = 1; // card que indica que paseadores no pueden publicar avisos momentaneamente
    }
  }

  /* Este metodo obtendrá avisos publicados por usuarios de la plataforma para ser atendidos por paseador */
  async obtenerAvisosActivos() {
    try {
      this.avisosActivos = await this.avisosService.getAvisosActivos();
      console.log('activos');
      console.log(this.avisosActivos);
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error obteniendo avisos activos');
    }
    this.chequearSiHayAvisosActivos();
  }

  verDetalle(idAviso) {
    // this.router.navigate(['home/avisos/aviso-detail', idAviso]);
  }

  public filtrarZonasSelect() {
    this.zonasFiltradas = this.zonas.filter(z => z.nombreZona.toLowerCase().includes(this.zonaEscrita))
  }

  aplicarFiltros(){
    this.avisosActivosFiltrados = this.avisosActivos.filter(avs=>avs.tipoServicio.idTipoServicio==this.idTipoElegido && avs.zona.idZona==this.zonaElegida)
  }

  // filtrarZonasPosta(){
  //   this.avisosActivosFiltrados = this.avisosActivos.filter(avs)
  // }

  // aplicarFiltros(){
  //   this.filtrarTipoServicio()

  // }

  async eliminar(idAviso, index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confimación',
      message: 'Desea eliminar este aviso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Sí',
          handler: () => {
            console.log('Confirmado');
            this.avisosService.eliminarAviso(idAviso);
            this.avisos.splice(index, 1);
          }
        }
      ]
    });

    await alert.present();
  }

  /* En caso de ser paseador, puede presionarse realizar para generar un servicio del aviso
   */
  async realizar(idAviso, idPerro, index) {
    const postData = {
      idAviso: '',
      idPerro: '',
      idContratante: ''
    };
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confimación',
      message: 'Desea llevar adelante el paseo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Sí',
          handler: () => {
            console.log('Confirmado');
            postData.idAviso = idAviso;
            postData.idPerro = idPerro;
            postData.idContratante = this.authUser.id;
            console.log(postData);
            this.serviciosService.contratarServicio(postData);
            this.avisosActivos.splice(index, 1);
            this.router.navigate(['home']);
          }
        }
      ]
    });

    await alert.present();
  }

  async chequearSiHayAvisosActivos() {
    /*
    if (this.avisosActivos.length <= 0){
      const alert = await this.alertController.create({
        header: 'No hay avisos',
        message: 'En este momento no hay avisos publicados',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
    */
  }



}
