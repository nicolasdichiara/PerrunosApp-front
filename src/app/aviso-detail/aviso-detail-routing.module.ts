import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisoDetailPage } from './aviso-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AvisoDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisoDetailPageRoutingModule {}
