import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaVisitadosPageRoutingModule } from './lista-visitados-routing.module';

import { ListaVisitadosPage } from './lista-visitados.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaVisitadosPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [ListaVisitadosPage]
})
export class ListaVisitadosPageModule {}
