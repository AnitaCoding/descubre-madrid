import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor(private tts:TextToSpeech) { }

  discurso(texto:string){
    this.tts.speak(texto)
    .then(()=>console.log('Success'))
    .catch((resp:any)=>console.log(resp))
  }
}
