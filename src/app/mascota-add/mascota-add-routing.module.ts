import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MascotaAddPage } from './mascota-add.page';

const routes: Routes = [
  {
    path: '',
    component: MascotaAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MascotaAddPageRoutingModule {}
