import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  */
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)},
  {
    path: 'mascota-detail/:id',
    loadChildren: () => import('./mascota-detail/mascota-detail.module').then( m => m.MascotaDetailPageModule)
  },
  {
    path: 'mascota-add',
    loadChildren: () => import('./mascota-add/mascota-add.module').then( m => m.MascotaAddPageModule)
  },
  {
    path: 'mascota-edit/:id',
    loadChildren: () => import('./mascota-edit/mascota-edit.module').then( m => m.MascotaEditPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  }
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
