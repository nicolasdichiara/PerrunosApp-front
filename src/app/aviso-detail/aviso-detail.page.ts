import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aviso } from 'src/domain/aviso';
import { Mascota } from 'src/domain/mascota';
import { AvisosService } from '../services/avisos.service';
import { MascotasService } from '../services/mascotas.service';
import { ToastService } from '../services/toast.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-aviso-detail',
  templateUrl: './aviso-detail.page.html',
  styleUrls: ['./aviso-detail.page.scss'],
})
export class AvisoDetailPage implements OnInit {

  idAviso: number
  aviso: Aviso
  public authUser: any;
  mascotas: Array<Mascota> = [];
  idMascota: number

  constructor(
    private route: ActivatedRoute,
    private avisosService: AvisosService,
    private toastService: ToastService,
    private auth: UsuariosService,
    private mascotasService: MascotasService,
    private router: Router
  ) {
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.idAviso = params['id'];
      if (this.idAviso) {
        try {
          this.aviso = await this.avisosService.getAvisoById(this.idAviso);
          console.log(this.aviso);
        } catch (error) {
          this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
        }
      }
      if (this.authUser.tipoPerfil == 'Duenio') {
        try {
          this.mascotas = await this.mascotasService.getMascotasUser(this.authUser.id);
        } catch (error) {
          this.toastService.presentToast('No se han podido cargar sus mascotas, reintente.' + error);
        }
      }
    });
  }

  puedoContactar() {
    return !this.idMascota
  }

  contactar() {
    console.log(this.authUser.id)
    this.avisosService.contactarAviso(this.idAviso, this.authUser.id)
    console.log(this.rutaWhatsapp())
    window.location.href = this.rutaWhatsapp()
  }

  rutaWhatsapp(){
    return "https://api.whatsapp.com/send?phone=+54" + this.aviso?.telefono +
    "&text=Hola, soy dueño de una mascota en PerrunosApp y quiero conocer más sobre su servicio," +
    " le dejo el Link al perfil de mi mascota " + "https://perrunosapp.com/home/mascota-detail/?id=" + this.idMascota
  }

}
