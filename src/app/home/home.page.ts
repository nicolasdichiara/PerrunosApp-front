import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public selectedIndex = 0;

  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/home/menuuser/perfil',
      icon: 'person'
    },
    {
      title: 'Mis Mascotas',
      url: '/home/mascotas',
      icon: 'heart'
    },
    {
      title: 'Agregar Mascota',
      url: '/home/mascota-add',
      icon: 'add-circle'
    },
    {
      title: 'Ver ubicación',
      url: '/home/geolocalizacion',
      icon: 'map'
    }
  ];

  public authUser: any;
  constructor(private auth: UsuariosService) {}

  isLoggedIn(){
    if (this.authUser){
      return true;
    }else {
      return false;
    }
  }

  ngOnInit() {

    // this.auth.getUserData();
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      console.log(res);
    });
    const path = window.location.pathname.split('home')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }




}
