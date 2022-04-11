import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichaItemPageRoutingModule } from './ficha-item-routing.module';

import { FichaItemPage } from './ficha-item.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaItemPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [FichaItemPage],
  providers:[TextToSpeech]
})
export class FichaItemPageModule {}
