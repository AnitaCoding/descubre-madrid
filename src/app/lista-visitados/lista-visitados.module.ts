import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaVisitadosPageRoutingModule } from './lista-visitados-routing.module';

import { ListaVisitadosPage } from './lista-visitados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaVisitadosPageRoutingModule
  ],
  declarations: [ListaVisitadosPage]
})
export class ListaVisitadosPageModule {}
