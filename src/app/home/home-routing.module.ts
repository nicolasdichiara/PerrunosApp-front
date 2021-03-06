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
          {
            path: 'token-gen',
            loadChildren: () => import('../token-gen/token-gen.module').then( m => m.TokenGenPageModule)
          },
          {
            path: 'faq',
            loadChildren: () => import('../faq/faq.module').then( m => m.FaqPageModule)
          }
        ]
      },
      {
        path: 'reportar',
        loadChildren: () => import('../reportar/reportar.module').then(m => m.ReportarPageModule)
      },
      {
        path: 'reportes',
        children: [
          {
            path: '',
            loadChildren: () => import('../reportes/reportes.module').then(m => m.ReportesPageModule)
          }
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
            path: 'pagar/:idServicio',
            loadChildren: () => import('../pagar/pagar.module').then( m => m.PagarPageModule)
          },
          {
            path: 'avisos-add',
            loadChildren: () => import('../avisos-add/avisos-add.module').then(m => m.AvisosAddPageModule)
          },
          {
            path: 'aviso-detail/:id',
            loadChildren: () => import('../aviso-detail/aviso-detail.module').then(m => m.AvisoDetailPageModule)
          },
          {
            path: 'aviso-edit/:id',
            loadChildren: () => import('../aviso-edit/aviso-edit.module').then(m => m.AvisoEditPageModule)
          }
        ]
      },
      {
        path: 'promociones',
        children: [
          {
            path: '',
            loadChildren: () => import('../promociones/promociones.module').then(m => m.PromocionesPageModule)
          },
          {
            path: 'promocion-agregar',
            loadChildren: () => import('../promocion-agregar/promocion-agregar.module').then(m => m.PromocionAgregarPageModule)
          },
          {
            path: 'promocion-detail/:id',
            loadChildren: () => import('../promocion-detail/promocion-detail.module').then(m => m.PromocionDetailPageModule)
          },
          {
            path: 'promocion-edit/:id',
            loadChildren: () => import('../promocion-edit/promocion-edit.module').then(m => m.PromocionEditPageModule)
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
        path: 'subir-imagen-mascota/:id',
        loadChildren: () =>
          import('../subidaImagen-mascota/subidaImagen-mascota.module').then(m => m.SubidaImagenPageModule)
      },
      {
        path: 'mascotas',
        loadChildren: () => import('../mascotas/mascotas.module').then(m => m.MascotasPageModule)
      },
      {
        path: 'avisos-guardados',
        loadChildren: () => import('../avisos-guardados/avisos-guardados.module').then(m => m.AvisosGuardadosPageModule)
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

