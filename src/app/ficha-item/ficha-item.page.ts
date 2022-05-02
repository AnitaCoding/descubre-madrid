import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ComunicarDatosItemService } from '../services/comunicar-datos-item.service';
import * as L from 'leaflet';
import { TtsService } from '../services/tts.service';
import { StorageService } from '../services/storage.service';
import { ItemTypeService } from '../services/item-type.service';


@Component({
  selector: 'app-ficha-item',
  templateUrl: './ficha-item.page.html',
  styleUrls: ['./ficha-item.page.scss'],
})
export class FichaItemPage implements OnInit {

  itemSeleccionado: Item;
  backLink:string = 'item-list';
  almacenado: boolean;
  itemType: string = '';
  isVisitado: boolean;

 private map:any;

  constructor(public servicio_comunica_datos: ComunicarDatosItemService,
    private servicio_tts:TtsService,
    private storage_service:StorageService,
    private itemTypeService:ItemTypeService) {
    this.itemSeleccionado = new Item();
    this.itemSeleccionado = this.servicio_comunica_datos.currentItem;
    this.isVisitado = false;
    
  }

  ngOnInit() { 
    
   }

  async ionViewWillEnter(){
    this.backLink = await this.storage_service.get('BackLink');
    this.actualizarItem();    
    this.almacenado=false;
    this.comprobarFavoritos();
    this.comprobarVisitados();
    this.itemType = this.itemTypeService.itemType;
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
    if(this.itemSeleccionado.location){        
      let circle = L.circle([this.itemSeleccionado.location.latitude, this.itemSeleccionado.location.longitude], {
        color: 'blue',
        fillColor: '#fff',
        fillOpacity: 0.5,
        radius: 10
    }).addTo(this.map);
      //let m = L.marker([item.location.latitude, item.location.longitude]).addTo(this.map);
    }

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

  async almacenarFavoritos(){
    let lista_favoritos = new Array();
    if((await this.storage_service.get('listaFavoritos'))==null){
      lista_favoritos.push(this.itemSeleccionado);
      this.storage_service.set('listaFavoritos', JSON.stringify(lista_favoritos))
    }else{
      lista_favoritos = JSON.parse(await this.storage_service.get('listaFavoritos'));
      lista_favoritos.push(this.itemSeleccionado);
      this.storage_service.set('listaFavoritos', JSON.stringify(lista_favoritos))
    }
  }

  //TODO:revisar esto, hay que almacenarlos por tipo de item

  async almacenarVisitados(){
    let lista_visitados = new Array();

    if((await this.storage_service.get('listaVisitados'))==null){
      
      lista_visitados.push(this.itemSeleccionado);
      this.storage_service.set('listaVisitados', JSON.stringify(lista_visitados))
      
    }else{

      lista_visitados = JSON.parse(await this.storage_service.get('listaVisitados'));
      lista_visitados.push(this.itemSeleccionado);
      this.storage_service.set('listaVisitados',JSON.stringify(lista_visitados))
    }
    this.eliminarFavorito(this.itemSeleccionado.id); 
  }

  async eliminarFavorito(id:string){
    let i:number = 0;
    let lista_favoritos = JSON.parse(await this.storage_service.get('listaFavoritos'))
    if(lista_favoritos.length <=1){
      this.storage_service.remove('listaFavoritos')
    }else{
      lista_favoritos.forEach(item=>{
        if(item.id == id){
          lista_favoritos.splice(i,1);
          this.storage_service.set('listaFavoritos', JSON.stringify(lista_favoritos))  
        }
      i++;
      })
    }
  }

  async comprobarFavoritos(){
    let lista_favoritos = new Array();
    if(await this.storage_service.get('listaFavoritos')!==null){
      lista_favoritos = JSON.parse(await this.storage_service.get('listaFavoritos'))
      lista_favoritos.forEach(item=>{
        if(item.id == this.itemSeleccionado.id){
          this.almacenado = true;
        }
      })
    }
  }

  async comprobarVisitados(){
    let lista_visitados = new Array();
    if(await this.storage_service.get('listaVisitados')!==null){
      lista_visitados = JSON.parse(await this.storage_service.get('listaVisitados'))
      lista_visitados.forEach(item=>{
        if(item.id == this.itemSeleccionado.id){
          this.almacenado = true;
          this.isVisitado = true;
        }
      })
    }
  }
}
