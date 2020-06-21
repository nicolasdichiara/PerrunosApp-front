import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisosAddPage } from './avisos-add.page';

const routes: Routes = [
  {
    path: '',
    component: AvisosAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisosAddPageRoutingModule {}
