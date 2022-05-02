import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaVisitadosPage } from './lista-visitados.page';

const routes: Routes = [
  {
    path: '',
    component: ListaVisitadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaVisitadosPageRoutingModule {}
