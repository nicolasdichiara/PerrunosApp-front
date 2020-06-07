import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MascotaEditPage } from './mascota-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MascotaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MascotaEditPageRoutingModule {}
