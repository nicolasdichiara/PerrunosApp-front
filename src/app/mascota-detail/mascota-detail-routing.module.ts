import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MascotaDetailPage } from './mascota-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MascotaDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MascotaDetailPageRoutingModule {}
