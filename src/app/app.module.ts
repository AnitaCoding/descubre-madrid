import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FontAwesomeModule, IonicStorageModule.forRoot({
    driverOrder: [Drivers.LocalStorage],
  })],
  providers: [TextToSpeech,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Diagnostic],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(library: FaIconLibrary) { 
		library.addIconPacks(fas);
	}

}
