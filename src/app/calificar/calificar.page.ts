import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';
import { ToastController } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';
import { ToastService } from '../services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.page.html',
  styleUrls: ['./calificar.page.scss'],
})
export class CalificarPage implements OnInit {

  authUser: any;
  postDataCalificacion = {
    idServicio: '',
    calificacion: ''
  };
  calificaciones: Array<{id: number, desc: string}> = [
    {id: 1, desc: 'Malo'},
    {id: 2, desc: 'Regular'},
    {id: 3, desc: 'Aceptable'},
    {id: 4, desc: 'Bueno'},
    {id: 5, desc: 'Excelente'}
  ];
  calificacionSeleccionada: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviciosService: ServiciosService,
    private toastService: ToastService,
    private auth: UsuariosService
  ) { }

  ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
    });
    this.route.params.subscribe(async params => {
      this.postDataCalificacion.idServicio = params['id'];
    });
  }

  toHome(){
    this.router.navigate(['home']);
  }

  async calificar() {
    if (this.calificacionSeleccionada){
      this.postDataCalificacion.calificacion = this.calificacionSeleccionada;
      try {
        if (this.authUser.tipoPerfil == 'Duenio'){
          await this.serviciosService.calificarServicioPrestador(this.postDataCalificacion);
        }else{
          await this.serviciosService.calificarServicioDuenio(this.postDataCalificacion);
        }
        this.toastService.presentToast('Gracias!');
        this.router.navigate(['home']);
      } catch (error) {
        this.toastService.presentToast('Ha ocurrido un error calificando');
      }
    }else{
      this.toastService.presentToast('Seleccione una calificación por favor');
    }
  }

}
