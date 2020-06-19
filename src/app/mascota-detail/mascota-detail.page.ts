import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MascotasService } from '../services/mascotas.service';
import { ToastService } from '../services/toast.service';
import { Mascota } from 'src/domain/mascota';

@Component({
  selector: 'app-mascota-detail',
  templateUrl: './mascota-detail.page.html',
  styleUrls: ['./mascota-detail.page.scss'],
})
export class MascotaDetailPage implements OnInit {

  idMascota: number;
  mascota: Mascota;
  today: any = new Date();

  constructor(
    private route: ActivatedRoute,
    private mascotasService: MascotasService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.idMascota = params['id'];
      if (this.idMascota){
        try {
          this.mascota = await this.mascotasService.getMascotaById(this.idMascota);
          console.log(this.mascota);
        } catch (error) {
          this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
        }
      }
    });
  }

}
