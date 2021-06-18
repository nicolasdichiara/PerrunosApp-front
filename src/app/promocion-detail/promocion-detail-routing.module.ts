import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromocionDetailPage } from './promocion-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PromocionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromocionDetailPageRoutingModule {}
