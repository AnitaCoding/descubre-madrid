import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ComunicarDatosItemService } from '../services/comunicar-datos-item.service';
import * as L from 'leaflet';
import { TtsService } from '../services/tts.service';


@Component({
  selector: 'app-ficha-item',
  templateUrl: './ficha-item.page.html',
  styleUrls: ['./ficha-item.page.scss'],
})
export class FichaItemPage implements OnInit {

  itemSeleccionado: Item;

 private map:any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.itemSeleccionado.location.latitude, this.itemSeleccionado.location.longitude],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(public servicio_comunica_datos: ComunicarDatosItemService,
    private servicio_tts:TtsService) {
    this.itemSeleccionado = new Item();
    this.itemSeleccionado = this.servicio_comunica_datos.currentItem;
    
  }

  ngOnInit() {  }

  ionViewDidEnter(){
    this.actualizarItem();    
    this.initMap();
 
  }

  ionViewWillLeave(){
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  }

  actualizarItem(){
    if(this.itemSeleccionado.title!=''){
      this.itemSeleccionado = this.servicio_comunica_datos.currentItem;
    }
  }

  escuchar(){
    this.servicio_tts.discurso(this.itemSeleccionado.organization['organization-desc'])
  }

}
