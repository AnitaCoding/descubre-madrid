import { Component, OnInit} from '@angular/core';
import { GetItemsService } from '../services/get-items.service';
import { Item } from 'src/app/models/item';
import { ItemTypeService } from '../services/item-type.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import * as L from 'leaflet';
//import AwesomeMarkers from 'leaflet.awesome-markers';
import { ComunicarDatosItemService } from '../services/comunicar-datos-item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {
  filtrar: boolean = false;
  listaItems:Array<Item>;
  listaItems_aux:Array<Item>;
  itemType:string='';
  currentIcon:IconProp = null;
  filtro_activo:boolean = false;
  mapa_activo:boolean = false;

  current_district:string = '';

  /***iconos***/

  monumentoIcon:IconProp = 'monument';
  edificioIcon:IconProp = 'landmark-dome';
  museoIcon:IconProp = 'building-columns';
  parqueIcon:IconProp = 'tree';
  infoIcon:IconProp = 'circle-info';

  /***Leaflet-Mapas***/

  private map:any;

  constructor(public itemTypeService:ItemTypeService,
    public servicio_getItems:GetItemsService,
    public servicio_comunica_datos: ComunicarDatosItemService) {  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter');
    this.listaItems = new Array<Item>();
    this.listaItems_aux = new Array<Item>();
    console.log('will enter ' + this.current_district);
    this.itemType = this.itemTypeService.itemType;
    
    this.switchItemType();

    //Si está creado el mapa de antes, da error,
    //para prevenirlo, ejecutamos estas líneas
  }

  ionViewDidEnter(){
  }

  ionViewWillLeave(){

    console.log('ionViewWillLeave');
    this.current_district = '';
    console.log('will leave ' + this.current_district);
    this.filtro_activo = false;
    this.mapa_activo = false;
    /*if (this.map) {
      this.map.off();
      this.map.remove();
    }*/

  }

  initMap(): void {
    this.map = L.map('map', {
      center: [ 40.4167278, -3.7033387 ],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  cambiarEstadoFiltrar(){
    if(!this.filtrar) {
      this.filtrar = true;
      this.filtro_activo = false;
    }else{
      this.filtrar = false;
      this.filtro_activo =true
    };
  }

  obtenerValue(event){
    this.current_district = event.detail.value;
    console.log('current '+ this.current_district)
  }

  filtrarListaItems(event){
    this.obtenerValue(event);
    this.cambiarEstadoFiltrar();
    this.listaItems_aux = this.listaItems.filter(item => item.district == this.current_district);
  }

  switchItemType(){
    switch(this.itemType){

      case 'monumentos':
        this.currentIcon = this.monumentoIcon;
        this.getMonumentos();
      break;

      case 'edificios':
        this.currentIcon = this.edificioIcon;
        this.getEdificios();
      break;

      case 'museos':
        this.currentIcon = this.museoIcon;
        this.getMuseos();
      break;

      case 'parques':
        this.currentIcon = this.parqueIcon;
        this.getParquesJardines();
      break;

      case 'oficinas de turismo':
        this.currentIcon = this.infoIcon;
        this.getPuntosInformacionTuristica();
      break;

      case 'todos':
        this.currentIcon = this.monumentoIcon;
        this.getMonumentos();
        this.currentIcon = this.edificioIcon;
        this.getEdificios();
        this.currentIcon = this.museoIcon;
        this.getMuseos();
        this.currentIcon = this.parqueIcon;
        this.getParquesJardines();
        this.currentIcon = this.infoIcon;
        this.getPuntosInformacionTuristica();
      break;

    }
  }
  

  getMonumentos(){
    this.servicio_getItems.getAllMonumentos()
    .then(respuesta=>respuesta.json())
    .then(data=>this.mostrarItems(data))
    .catch(error=>this.mostrarError(error))
  }

  getEdificios(){
    this.servicio_getItems.getAllEdificios()
    .then(respuesta=>respuesta.json())
    .then(data=>this.mostrarItems(data))
    .catch(error=>this.mostrarError(error))
  }

  getMuseos(){
    this.servicio_getItems.getAllMuseos()
    .then(respuesta=>respuesta.json())
    .then(data=>this.mostrarItems(data))
    .catch(error=>this.mostrarError(error))
  }

  getParquesJardines(){
    this.servicio_getItems.getAllParquesJardines()
    .then(respuesta=>respuesta.json())
    .then(data=>this.mostrarItems(data))
    .catch(error=>this.mostrarError(error))
  }

  getPuntosInformacionTuristica(){
    this.servicio_getItems.getAllPInformacionTuristica()
    .then(respuesta=>respuesta.json())
    .then(data=>this.mostrarItems(data))
    .catch(error=>this.mostrarError(error))
  }

  mostrarItems (respuesta:any)
  {
    this.listaItems = <Array<Item>>respuesta['@graph'];  
        this.listaItems.forEach(m => {
          if(m.address.hasOwnProperty('district')){
            let aux_array_district = m.address["district"]["@id"].split('/');
            m.district = aux_array_district[aux_array_district.length-1];
          }
          
          if(m.address.hasOwnProperty('area')){
            let aux_array_barrio = m.address["area"]["@id"].split('/');
            m.area = aux_array_barrio[aux_array_barrio.length-1];
          }        
        })
        
  }


  mostrarError (error:any):void
  {
    console.error('Ha ocurrido un error: (' + error.status + ') - ' + error.message);
  }

  verEnMapa(){
    if(this.map){
      this.map.off();
      this.map.remove();
      this.mapa_activo=false;
      console.log('cerral')
    }else{
      this.mapa_activo=true;
      this.initMap();
      console.log('abril')
    }    
   
    this.listaItems.forEach(item =>{
      if(item.location){        
        L.marker([item.location.latitude, item.location.longitude]).addTo(this.map);
      }
    })
  }

  comunicarDatos(id:string){
    this.listaItems.forEach(item=>{
      if(id == item.id){
        this.servicio_comunica_datos.currentItem = item;
        console.log(this.servicio_comunica_datos.currentItem.title);
      }
    })
  }

}
