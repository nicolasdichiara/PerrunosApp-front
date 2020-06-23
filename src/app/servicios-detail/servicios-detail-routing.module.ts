import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiciosDetailPage } from './servicios-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ServiciosDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosDetailPageRoutingModule {}
