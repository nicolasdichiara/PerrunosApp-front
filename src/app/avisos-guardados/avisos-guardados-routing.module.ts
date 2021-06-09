import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisosGuardadosPage } from './avisos-guardados.page';

const routes: Routes = [
  {
    path: '',
    component: AvisosGuardadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisosGuardadosPageRoutingModule {}
