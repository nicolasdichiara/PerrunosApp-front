import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubidaImagenPage } from './subidaImagen.page';


const routes: Routes = [
  {
    path: '',
    component: SubidaImagenPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubidaImagenPageRoutingModule {}
