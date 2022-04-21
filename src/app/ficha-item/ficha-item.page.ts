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
  backLink:string;

  //TODO: No tengo que desactivar el botón.
  //Cambiar el icono de corazón por una X o algo para quitarlo de favoritos
  almacenado: boolean;

 private map:any;

  constructor(public servicio_comunica_datos: ComunicarDatosItemService,
    private servicio_tts:TtsService) {
    this.itemSeleccionado = new Item();
    this.itemSeleccionado = this.servicio_comunica_datos.currentItem;
    
  }

  ngOnInit() { 
    
   }

  ionViewWillEnter(){
    this.backLink  = localStorage.getItem('Back-link');    
    this.actualizarItem();    
    this.almacenado=false;
    this.comprobarFavoritos();
    console.log(this.itemSeleccionado.id)
  }

  ionViewDidEnter(){    
    this.initMap();
 
  }

  ionViewWillLeave(){
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
    
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [this.itemSeleccionado.location.latitude, this.itemSeleccionado.location.longitude],
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    console.log('mapa creado')
  }

  actualizarItem(){
    if(this.itemSeleccionado.title!=''){
      this.itemSeleccionado = this.servicio_comunica_datos.currentItem;
    }
  }

  escuchar(){
    this.servicio_tts.discurso(this.itemSeleccionado.organization['organization-desc'])
  }

  almacenarFavoritos(){
    let lista_favoritos = new Array();
    lista_favoritos.push(this.itemSeleccionado)
    if(!localStorage.getItem('lista_favoritos')){
      localStorage.setItem('lista_favoritos', JSON.stringify(lista_favoritos))
    }else{
      lista_favoritos = JSON.parse(localStorage.getItem('lista_favoritos'));
      lista_favoritos.push(this.itemSeleccionado);
      localStorage.setItem('lista_favoritos', JSON.stringify(lista_favoritos))
    }
  }

  //TODO:revisar esto, hay que almacenarlos por tipo de item

  almacenarVisitados(){
    let lista_visitados = new Array();
    lista_visitados.push(this.itemSeleccionado);
    if(!localStorage.getItem('lista_visitados')){
      localStorage.setItem('lista_visitados', JSON.stringify(lista_visitados))
    }else{
      lista_visitados = JSON.parse(localStorage.getItem('lista_visitados'));
      lista_visitados.push(this.itemSeleccionado);
      localStorage.setItem('lista_visitados', JSON.stringify(lista_visitados))
    }
    
  }

  comprobarFavoritos(){
    let lista_favoritos = new Array();
    lista_favoritos = JSON.parse(localStorage.getItem('lista_favoritos'));
    lista_favoritos.forEach(item=>{
      if(item.id == this.itemSeleccionado.id){
        this.almacenado = true;
      }
    })
  }


}
