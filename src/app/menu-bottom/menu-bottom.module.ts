import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuBottomPageRoutingModule } from './menu-bottom-routing.module';

import { MenuBottomPage } from './menu-bottom.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    MenuBottomPageRoutingModule
  ],
  declarations: [MenuBottomPage]
})
export class MenuBottomPageModule {}
