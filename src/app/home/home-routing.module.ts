import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from '../guards/home.guard';
import { HomePage } from './home.page';
import { UserDataResolver } from '../resolvers/user-data.resolver';

/*
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    // canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
  }
];
*/

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    children: [
      {
        path: 'menuuser',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../menuuser/menuuser.module').then(m => m.MenuuserPageModule)
          },
          {
            path: 'perfil',
            loadChildren: () =>
              import('../perfil/perfil.module').then(m => m.PerfilPageModule)
          },
          {
            path: 'perfil-edit',
            loadChildren: () =>
              import('../perfil-edit/perfil-edit.module').then(m => m.PerfilEditPageModule)
          },
          {
            path: 'subir-imagen',
            loadChildren: () =>
              import('../subidaImagen/subidaImagen.module').then(m => m.SubidaImagenPageModule)
          },
        ]
      },
      {
        path: 'servicios',
        children: [
          {
            path: '',
            loadChildren: () => import('../servicios/servicios.module').then(m => m.ServiciosPageModule)
          },
          {
            path: 'servicios-detail/:id',
            loadChildren: () => import('../servicios-detail/servicios-detail.module').then(m => m.ServiciosDetailPageModule)
          },
          {
            path: 'calificar/:id',
            loadChildren: () => import('../calificar/calificar.module').then( m => m.CalificarPageModule)
          },
          {
            path: 'historial',
            loadChildren: () => import('../historial/historial.module').then( m => m.HistorialPageModule)
          },
// aca va pagar
        ]
      },
      {
        path: 'avisos',
        children: [
          {
            path: '',
            loadChildren: () => import('../avisos/avisos.module').then(m => m.AvisosPageModule)
          },
          {
            path: 'avisos-add',
            loadChildren: () => import('../avisos-add/avisos-add.module').then(m => m.AvisosAddPageModule)
          }
        ]
      },
      {
        path: 'geolocalizacion/:id',
        loadChildren: () => import('../geolocalizacion/geolocalizacion.module').then(m => m.GeolocalizacionPageModule)
      },
      {
        path: 'mascota-detail/:id',
        loadChildren: () => import('../mascota-detail/mascota-detail.module').then(m => m.MascotaDetailPageModule)
      },
      {
        path: 'mascota-add',
        loadChildren: () => import('../mascota-add/mascota-add.module').then(m => m.MascotaAddPageModule)
      },
      {
        path: 'mascota-edit/:id',
        loadChildren: () => import('../mascota-edit/mascota-edit.module').then(m => m.MascotaEditPageModule)
      },
      {
        path: 'mascotas',
        loadChildren: () => import('../mascotas/mascotas.module').then(m => m.MascotasPageModule)
      },
      {
        path: '',
        redirectTo: '/home/menuuser',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }

