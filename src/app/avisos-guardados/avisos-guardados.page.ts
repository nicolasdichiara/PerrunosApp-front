import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Aviso } from 'src/domain/aviso';
import { TipoServicio } from 'src/domain/tipoServicio';
import { AvisosService } from '../services/avisos.service';
import { LoadingService } from '../services/loading.service';
import { ServiciosService } from '../services/servicios.service';
import { ToastService } from '../services/toast.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-avisos-guardados',
  templateUrl: './avisos-guardados.page.html',
  styleUrls: ['./avisos-guardados.page.scss'],
})
export class AvisosGuardadosPage implements OnInit {

  public authUser: any
  avisos: Array<Aviso> = []
  avisosFiltrados: Array<Aviso> = []
  idTipoElegido: number
  tipos: Array<TipoServicio> = []

  constructor(
    private router: Router,
    private alertController: AlertController,
    private auth: UsuariosService,
    private avisosService: AvisosService,
    private serviciosService: ServiciosService,
    private toastService: ToastService,
    public loading: LoadingService
  ) {}

  async ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      if (this.authUser.id) {
        this.obtenerAvisos();
      }
    });
    this.tipos = await this.serviciosService.getTiposDeServicios();
    console.log(this.tipos)
  }

  async obtenerAvisos() {
    try {
      console.log(this.authUser.id)
      this.avisos = await this.avisosService.getAvisosContactados(this.authUser.id);
      this.avisosFiltrados = this.avisos
      console.log(this.avisos);
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error obteniendo avisos' + error);
    }
  }

  aplicarFiltros() {
    this.avisosFiltrados = this.avisos.filter(avs => avs.tipoServicio.idTipoServicio == this.idTipoElegido)
  }

  verDetalle(idAviso) {
    this.router.navigate(['home/avisos/aviso-detail', idAviso]);
  }

  async eliminar(idAviso, index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confimación',
      message: 'Desea eliminar este aviso de su lista?',
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
            this.avisosService.eliminarAvisoContactado(idAviso, this.authUser.id);
            this.avisos.splice(index, 1);
            this.avisosFiltrados.splice(index, 1);
          }
        }
      ]
    });

    await alert.present();
  }

  async realizar(idAviso, idTipo, idPrestador, index) {
    const postData = {
      idAviso: '',
      idContratante: '',
      tipo: ''
    };
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confimación',
      message: 'Desea llevar adelante el paseo? El paseador debe estar de acuerdo',
      inputs: [
        {
          name: 'token',
          type: 'text',
          placeholder: 'Token Prestador'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Sí',
          handler: async (values) => {
            console.log(values);
            console.log('Confirmado');
            postData.idAviso = idAviso;
            postData.idContratante = this.authUser.id;
            postData.tipo = idTipo
            console.log(postData);
            console.log(values.token + " validare contra el back buscando token de paseador con id:" + idPrestador);
            this.loading.present();
            await this.auth.getTokenPrestador(idPrestador).then((tok) => {
              console.log(tok)
              console.log('Token obtenido')
              if(tok.token == values.token){
                console.log('ACTIVA SERVICIO!')
                this.serviciosService.contratarServicio(postData).then(() => {
                  this.loading.dismiss();
                  this.router.navigate(['home']);
                })
                .catch(() => { this.toastService.presentToast('Ha ocurrido un error, reintente por favor.') });
              }else{
                this.toastService.presentToast('El token ingresado no es correcto, Solicítelo al paseador para comenzar!');
                this.loading.dismiss();
                return false;
              }
              // 
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
