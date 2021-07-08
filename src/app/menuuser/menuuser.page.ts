import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Mascota } from 'src/domain/mascota';
import { MascotasService } from '../services/mascotas.service';
import { ToastService } from '../services/toast.service';
import { Servicio } from 'src/domain/servicio';
import { ServiciosService } from '../services/servicios.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Promocion } from 'src/domain/promocion';
import { PromocionesService } from '../services/promociones.service';
import { Usuario } from '../../domain/usuario';

@Component({
  selector: 'app-menuuser',
  templateUrl: './menuuser.page.html',
  styleUrls: ['./menuuser.page.scss'],
})
export class MenuuserPage implements OnInit {

  mascotas: Array<Mascota> = [];
  public authUser: any;
  userStats: Usuario;
  servicios: Array<Servicio> = [];
  whatsapp: any = "https://api.whatsapp.com/send?phone=+541166899679&text=Hola"
  promocionesActivas: Promocion[];

  constructor(
    private auth: UsuariosService,
    private serviciosService: ServiciosService,
    private mascotasService: MascotasService,
    private toastService: ToastService,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private _promocionesService: PromocionesService
  ) { }

  ngOnInit() {
    /*
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;

      if (this.authUser.id){
        try {
          this.userStats = await this.auth.getUserById(this.authUser.id);
        } catch (error) {
          this.toastService.presentToast('No se ha podido actualizar calificacion');
        }
        if (this.authUser.tipoPerfil != 'Paseador'){
          try {
            this.mascotas = await this.mascotasService.getMascotasUser(this.authUser.id);
          } catch (error) {
            this.toastService.presentToast('No se han podido cargar sus mascotas, reintente.' + error);
          }
        }
      }

    });
*/
  }

  ionViewWillEnter() {
    console.log('cargando view');
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;
      console.log(this.authUser)

      if (this.authUser.id){
        try {
          this.userStats = await this.auth.getUserById(this.authUser.id);
        } catch (error) {
          this.toastService.presentToast('No se ha podido actualizar calificacion');
        }
        try {
          this.servicios = await this.serviciosService.getHistorialServiciosUser(this.authUser.id);
        } catch (error) {
          this.toastService.presentToast('No se ha podido actualizar historico');
        }
        if (this.authUser.tipoPerfil == 'Duenio'){
          console.log('busco promo')
          try {
            this.promocionesActivas = await this._promocionesService.getPromocionesActivas();
            console.log(this.promocionesActivas)
          } catch (error) {
            this.toastService.presentToast('No se han podido actualizar las ultimas promociones');
          }
        }
        if (this.authUser.tipoPerfil != 'Paseador'){
          try {
            this.mascotas = await this.mascotasService.getMascotasUser(this.authUser.id);
          } catch (error) {
            this.toastService.presentToast('No se han podido cargar sus mascotas, reintente.' + error);
          }
        }
      }

    });
  }

  logout(){
    this.auth.logout();
  }

  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        //this.getLocationCoordinates()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

}
