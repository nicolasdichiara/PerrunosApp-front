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
          }
        ]
      },
      {
        path: 'mascota-detail/:id',
        loadChildren: () => import('../mascota-detail/mascota-detail.module').then( m => m.MascotaDetailPageModule)
      },
      {
        path: 'mascota-add',
        loadChildren: () => import('../mascota-add/mascota-add.module').then( m => m.MascotaAddPageModule)
      },
      {
        path: 'mascota-edit/:id',
        loadChildren: () => import('../mascota-edit/mascota-edit.module').then( m => m.MascotaEditPageModule)
      },
      {
        path: 'mascotas',
        loadChildren: () => import('../mascotas/mascotas.module').then( m => m.MascotasPageModule)
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
export class HomePageRoutingModule {}

