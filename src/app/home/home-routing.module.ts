import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { UserDataResolver } from '../resolvers/user-data.resolver';

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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
