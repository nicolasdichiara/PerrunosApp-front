import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Aviso } from 'src/domain/aviso';
import { AvisosService } from '../services/avisos.service';
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

  constructor(
    private route: ActivatedRoute,
    private avisosService: AvisosService,
    private toastService: ToastService,
    private auth: UsuariosService,
  ) {
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.idAviso = params['id'];
      if (this.idAviso){
        try {
          this.aviso = await this.avisosService.getAvisoById(this.idAviso);
          console.log(this.aviso);
        } catch (error) {
          this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
        }
      }
    });
  }

  contactar(){
    return "https://api.whatsapp.com/send?phone=+54" + this.aviso?.telefono + "&text=Hola"
  }

}
