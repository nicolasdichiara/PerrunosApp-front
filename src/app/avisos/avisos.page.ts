import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../services/mascotas.service';
import { ToastService } from '../services/toast.service';
import { Mascota } from 'src/domain/mascota';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';
import { Aviso } from 'src/domain/aviso';
import { AvisosService } from '../services/avisos.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.page.html',
  styleUrls: ['./avisos.page.scss'],
})
export class AvisosPage implements OnInit {

  public authUser: any;
  avisos: Array<Aviso> = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private auth: UsuariosService,
    private avisosService: AvisosService,
    private mascotasService: MascotasService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      if (this.authUser.id){
        this.obtenerAvisos();
      }
    });
  }

  async obtenerAvisos(){
    try {
      this.avisos = await this.avisosService.getAvisosUser(this.authUser.id);
      console.log(this.avisos);
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error obteniendo avisos, reintente.' + error);
    }
  }

  verDetalle(idAviso){
    // this.router.navigate(['home/avisos/aviso-detail', idAviso]);
  }

  editar(idAviso){
    // this.router.navigate(['home/avisos/aviso-edit', idAviso]);
  }

  async eliminar(idAviso, index){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confimación',
      message: 'Desea eliminar esta mascota?',
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
            // this.obtenerMascotas();
          }
        }
      ]
    });

    await alert.present();
  }


}
