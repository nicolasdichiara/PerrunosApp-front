import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubidaImagenMascotaPage } from './subidaImagenMascota.page';


const routes: Routes = [
  {
    path: '',
    component: SubidaImagenMascotaPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubidaImagenMascotaPageRoutingModule {}