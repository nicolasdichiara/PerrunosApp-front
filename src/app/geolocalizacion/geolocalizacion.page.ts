import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input, OnDestroy} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { ToastService } from '../services/toast.service';
import { ServiciosService } from '../services/servicios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/domain/servicio';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';
import { Subscription, interval } from 'rxjs';
declare var google;

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})
export class GeolocalizacionPage implements OnInit, OnDestroy {

  latitude: any;
  longitude: any;
  @ViewChild('mapElement') mapNativeElement: ElementRef;

  idServicio: number;
  servicio: Servicio;
  public authUser: any;
  subscription: Subscription;
  postLocalizacionData = {
    idServicio: '',
    lat: '',
    lng: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private geolocation: Geolocation,
    private toastService: ToastService,
    private alertController: AlertController,
    private auth: UsuariosService,
    private serviciosService: ServiciosService
  ) { }

  ngOnInit() {
    this.auth.userData$.subscribe(async (res: any) => {
      this.authUser = res;
    });
    this.route.params.subscribe(async params => {
      this.idServicio = params['id'];
      if (this.idServicio){
        try {
          this.servicio = await this.serviciosService.getServicioById(this.idServicio);
          console.log(this.servicio);
          this.renderizado(); // muestro mapa con localizaciones


        } catch (error) {
          this.toastService.presentToast('Ha ocurrido un error, reintente.');
        }
      }
    });
    // Suscripción para actualización automatica
    const source = interval(10000);
    this.subscription = source.subscribe(val => {
      console.log('dale');
    });
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  renderizado(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 10
      });
      /*location object*/
      const pos = {
        lat: this.latitude,
        lng: this.longitude
      };
      map.setCenter(pos);
      const icon = {
        url: 'assets/icon/u.png', // image url
        scaledSize: new google.maps.Size(50, 50), // scaled size
      };

      // armo marker generico para user logueado
      const contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading">' + this.authUser.nombre + '</h1>' +
      '<div id="bodyContent">' +
      '<p>Esta es su posición actual</p>' +
      '</div>' +
      '</div>';
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
      });

      // Si es duenio el usuario logueado, muestro geolocalizacion de duenio, sino coordenadas del duenio en servicio
      if (this.authUser.tipoPerfil == 'Duenio'){
        // actualizo localizacion nube
        this.enviarLocalizacionDuenio(this.servicio.idServicio, pos.lat, pos.lng);
        // config marker
        const usuarioMarker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Usuario',
          icon: icon
        });
        usuarioMarker.addListener('click', () => {
          infowindow.open(map, usuarioMarker);
        });
      }else{
        const usuarioMarker = new google.maps.Marker({
          position: {
            lat: this.servicio.latitudDuenio ? +this.servicio.latitudDuenio : pos.lat,
            lng: this.servicio.longitudDuenio ? +this.servicio.longitudDuenio : pos.lng
          },
          map: map,
          title: 'Usuario',
          icon: icon
        });
      }

      // Si es paseador el usuario logueado, muestro geolocalizacion de duenio, sino coordenadas del duenio en servicio
      if (this.authUser.tipoPerfil == 'Paseador'){
        // actualizo localizacion nube
        this.enviarLocalizacionPrestador(this.servicio.idServicio, pos.lat, pos.lng);
        // config marker
        const paseadorMarker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Usuario',
          icon: icon
        });
        paseadorMarker.addListener('click', () => {
          infowindow.open(map, paseadorMarker);
        });
      } else {
        const paseadorMarker = new google.maps.Marker({
          position: {
            lat: this.servicio.latitudPrestador ? +this.servicio.latitudPrestador : pos.lat,
            lng: this.servicio.longitudPrestador ? +this.servicio.longitudPrestador : pos.lng
          },
          map: map,
          title: 'Paseador',
          icon: icon
        });
      }



    }).catch((error) => {
      this.toastService.presentToast('No se puede obtener localizacion, reintente');
      console.log('Error localizacion', error);
    });
  }


  async enviarLocalizacionPrestador(idServicio, lat, lng){
    this.postLocalizacionData.idServicio = idServicio;
    this.postLocalizacionData.lat = lat;
    this.postLocalizacionData.lng = lng;
    try {
      await this.serviciosService.establecerUbicacionPrestador(this.postLocalizacionData);
      console.log('actualizo ubicacion prestador');
    } catch (error) {
      this.toastService.presentToast('No se ha podido actualizar ubicacion en nube');
    }
  }

  async enviarLocalizacionDuenio(idServicio, lat, lng){
    this.postLocalizacionData.idServicio = idServicio;
    this.postLocalizacionData.lat = lat;
    this.postLocalizacionData.lng = lng;
    try {
      await this.serviciosService.establecerUbicacionDuenio(this.postLocalizacionData);
      console.log('actualizo ubicacion dueño');
    } catch (error) {
      this.toastService.presentToast('No se ha podido actualizar ubicacion en nube');
    }
  }


  async finalizarServicio(idServicio) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confimación',
      message: 'Desea finalizar el servicio?',
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
            try {
              this.serviciosService.finalizarServicio(idServicio);
              this.toastService.presentToast('Servicio Finalizado');
              this.router.navigate(['home/servicios/calificar/' + idServicio ]);
            }
            catch (error) {
              this.toastService.presentToast('Ha ocurrido un error, reintente.');
            }

          }
        }
      ]
    });

    await alert.present();

  }

}
