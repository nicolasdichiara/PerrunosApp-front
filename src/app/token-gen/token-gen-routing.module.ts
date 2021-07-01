import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokenGenPage } from './token-gen.page';

const routes: Routes = [
  {
    path: '',
    component: TokenGenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenGenPageRoutingModule {}
