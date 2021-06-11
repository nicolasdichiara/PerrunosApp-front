import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisoEditPage } from './aviso-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AvisoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisoEditPageRoutingModule {}
