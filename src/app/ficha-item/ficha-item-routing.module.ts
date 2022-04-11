import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaItemPage } from './ficha-item.page';

const routes: Routes = [
  {
    path: '',
    component: FichaItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaItemPageRoutingModule {}
