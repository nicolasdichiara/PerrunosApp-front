import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index.page';
import { IndexGuard } from '../guards/index.guard';

const routes: Routes = [
{
  path: '',
  component: IndexPage,
  canActivate: [IndexGuard],
  children: [
    {
      path: '',
      loadChildren: () =>
      import('../welcome/welcome.module').then(
      m => m.WelcomePageModule
      )
    },
    {
    path: 'login',
    loadChildren: () =>
    import('../login/login.module').then(m => m.LoginPageModule)
    },
    {
    path: 'register',
    loadChildren: () =>
    import('../register/register.module').then(m => m.RegisterPageModule)
    },
    {
      path: 'chat',
      loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
    }
  ]
}
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})

export class IndexPageRoutingModule {}
