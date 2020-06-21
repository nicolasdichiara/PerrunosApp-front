import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { ToastService } from '../services/toast.service';
declare var google;

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})
export class GeolocalizacionPage implements OnInit, AfterViewInit {

  latitude: any;
  longitude: any;
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  constructor(
    private geolocation: Geolocation,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 16
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

      const usuarioMarker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Usuario',
        icon: icon
      });

      const paseadorMarker = new google.maps.Marker({
        position: {lat: -41.550, lng: -71.083},
        map: map,
        title: 'Paseador',
        icon: icon
      });

      const contentString = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h1 id="firstHeading" class="firstHeading">Usuario</h1>' +
          '<div id="bodyContent">' +
          '<p>Esta es su posición actual</p>' +
          '</div>' +
          '</div>';
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
      });
      usuarioMarker.addListener('click', () => {
        infowindow.open(map, usuarioMarker);
      });
    }).catch((error) => {
      this.toastService.presentToast('No se puede obtener localizacion, reintente');
      console.log('Error localizacion', error);
    });
  }

}
