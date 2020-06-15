import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuuserPage } from './menuuser.page';

const routes: Routes = [
  {
    path: '',
    component: MenuuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuuserPageRoutingModule {}
