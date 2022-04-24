import { Component, OnInit} from '@angular/core';
import { GetItemsService } from '../services/get-items.service';
import { Item } from 'src/app/models/item';
import { ItemTypeService } from '../services/item-type.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import * as L from 'leaflet';
//import AwesomeMarkers from 'leaflet.awesome-markers';
import { ComunicarDatosItemService } from '../services/comunicar-datos-item.service';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {
  mensajeEspera: string = 'Cargando...';
  backLink:string = 'item-list';
  filtrar: boolean = false;
  listaItems:Array<Item>;
  listaItems_aux:Array<Item>;
  itemType:string='';
  currentIcon:IconProp = null;
  filtro_activo:boolean = false;
  mapa_activo:boolean = false;
  array_distritos: Array<Array<string>>;

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
    public servicio_comunica_datos: ComunicarDatosItemService,
    private diagnostic: Diagnostic,
    private platform:Platform,
    private loading:LoadingController,
    private storage_service:StorageService) {
      this.array_distritos = [['Centro', 'Centro'], ['Arganzuela', 'Arganzuela'], ['Retiro', 'Retiro'], 
      ['Salamanca', 'Salamanca'], ['Chamartín', 'Chamartin'], ['Tetuán', 'Tetuan'], ['Chamberí', 'Chamberi'], 
      ['Fuencarral-El Pardo', 'Fuencarral-ElPardo'], ['Moncloa', 'Moncloa'], ['Latina', 'Latina'], ['Carabanchel', 'Carabanchel'], 
      ['Usera', 'Usera'], ['Puente De Vallecas', 'PuenteDeVallecas'], ['Moratalaz', 'Moratalaz'], ['Ciudad Lineal', 'CiudadLineal'], 
      ['Hortaleza', 'Hortaleza'], ['Villaverde', 'Villaverde'], ['Villa De Vallecas', 'VillaDeVallecas'], ['Vicálvaro', 'Vicalvaro'],
      ['San Blas-Canillejas', 'SanBlas-Canillejas'], ['Barajas', 'Barajas']]
      }

  ngOnInit() {
    
    
  }

  ionViewWillEnter(){
    this.storage_service.set('BackLink', this.backLink)
    //localStorage.setItem('Back-link', this.backLink)
    this.presentLoading(this.mensajeEspera);
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
    if (this.mapa_activo) {
      this.map.off();
      this.map.remove();
    }    
    this.mapa_activo = false;

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

  async presentLoading(message:string){
    const l = await this.loading.create({
      cssClass: 'loading-class',
      message     
    })
    return await l.present()
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

  obtenerValue(d:string){
    this.current_district =d;
  }

  filtrarListaItems(d:string){
    this.obtenerValue(d);
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
        this.getAllItems()
        .then(() => this.loading.dismiss())


      break;

    }
  }

  getMonumentos(){
    this.servicio_getItems.getAllMonumentos()
    .then(respuesta=>respuesta.json())
    .then(data=>this.mostrarItems(data, this.currentIcon))
    .then(() => this.loading.dismiss())
    .catch(error=>this.mostrarError(error))
  }

  getEdificios(){
    this.servicio_getItems.getAllEdificios()
    .then(respuesta=>respuesta.json())
    .then(data=>this.mostrarItems(data, this.currentIcon))
    .then(() => this.loading.dismiss())
    .catch(error=>this.mostrarError(error))
  }

  getMuseos(){
    this.servicio_getItems.getAllMuseos()
    .then(respuesta=>respuesta.json())
    .then(data=>this.mostrarItems(data, this.currentIcon))
    .then(() => this.loading.dismiss())
    .catch(error=>this.mostrarError(error))
  }

  getParquesJardines(){
    this.servicio_getItems.getAllParquesJardines()
    .then(respuesta=>respuesta.json())
    .then(data=>this.mostrarItems(data, this.currentIcon))
    .then(() => this.loading.dismiss())
    .catch(error=>this.mostrarError(error))
  }

  getPuntosInformacionTuristica(){
    this.servicio_getItems.getAllPInformacionTuristica()
    .then(respuesta=>respuesta.json())
    .then(data=>this.mostrarItems(data, this.currentIcon))
    .then(() => this.loading.dismiss())

    .catch(error=>this.mostrarError(error))
  }

  async getAllItems(){

    this.servicio_getItems.getAllMonumentos()
    .then(respuesta=>respuesta.json())
    .then(data => this.mostrarTodos(data, this.monumentoIcon))
    .then(() => this.loading.dismiss())
    .catch(error=>this.mostrarError(error))

    this.servicio_getItems.getAllEdificios()
    .then(respuesta=>respuesta.json())
    .then(data => this.mostrarTodos(data, this.edificioIcon))
    .catch(error=>this.mostrarError(error))

    this.servicio_getItems.getAllMuseos()
    .then(respuesta=>respuesta.json())
    .then(data => this.mostrarTodos(data, this.museoIcon))
    .catch(error=>this.mostrarError(error))

    this.servicio_getItems.getAllParquesJardines()
    .then(respuesta=>respuesta.json())
    .then(data => this.mostrarTodos(data, this.parqueIcon))
    .catch(error=>this.mostrarError(error))

    this.servicio_getItems.getAllPInformacionTuristica()
    .then(respuesta=>respuesta.json())
    .then(data => this.mostrarTodos(data, this.infoIcon))
    .catch(error=>this.mostrarError(error))
    
    //await this.loading.dismiss()

  }

  mostrarItems (respuesta:any, icon:IconProp){
    this.listaItems = <Array<Item>>respuesta['@graph'];
    //Ordenamos alfabéticamente
    this.listaItems.forEach(item => item.icon = icon);
    this.ordenarAlfabeticamente();
    this.prevencionDeErrores();
  }

  ordenarAlfabeticamente(){
    this.listaItems.sort(function(a:Item, b:Item) {
      return a.title.localeCompare(b.title)
    })
  }

  mostrarTodos(respuesta:any, icon:IconProp){
    this.listaItems_aux=<Array<Item>>respuesta['@graph'];
    this.setItemIcon(icon)    
    this.sumaItems();
    this.ordenarAlfabeticamente();
    this.prevencionDeErrores();
  }

  
  sumaItems(){
    this.listaItems_aux.forEach(item =>
      this.listaItems.push(item));
  }

  setItemIcon(icon:IconProp){
    this.listaItems_aux.forEach(item => item.icon = icon)
  }

  mostrarError (error:any):void
  {
    console.error('Ha ocurrido un error: (' + error.status + ') - ' + error.message);
  }

  prevencionDeErrores(){
    this.listaItems.forEach(m => {
      if(m.address.hasOwnProperty('district')){
        let aux_array_district = m.address["district"]["@id"].split('/');
        m.district = aux_array_district[aux_array_district.length-1];
      }      
      if(m.address.hasOwnProperty('area')){
        let aux_array_barrio = m.address["area"]["@id"].split('/');
        m.area = aux_array_barrio[aux_array_barrio.length-1];
      }
      
      if(!m.hasOwnProperty('organization')){
        m.organization = 'El ayuntamiento no aporta información adicional sobre este sitio. Toque el botón de información para ampliar los datos sobre el lugar.'
      }
    })
  }

  //TODO:   
          //con circle, no da errores. ver tema de iconos
          //ver lo de boundles para centrar bien.

  verEnMapa(){
    if(this.mapa_activo){
      this.map.off();
      this.map.remove();
      this.mapa_activo=false;
      console.log('cerral')
    }else{
      this.mapa_activo=true;
      this.initMap();
      console.log('abril')
      this.listaItems.forEach(item =>{
        if(item.location){        
          let circle = L.circle([item.location.latitude, item.location.longitude], {
            color: 'blue',
            fillColor: '#fff',
            fillOpacity: 0.5,
            radius: 10
        }).addTo(this.map);
          //let m = L.marker([item.location.latitude, item.location.longitude]).addTo(this.map);
        }
      })

    }  

  }

  comunicarDatos(id:string){
    this.listaItems.forEach(item=>{
      if(id == item.id){
        this.servicio_comunica_datos.currentItem = item;
        console.log('it l' + this.servicio_comunica_datos.currentItem.id);
      }
    })
  }


  geolocalizarDispositivo (){
    alert("te voy a buscar");
    //Directamente le pido. si no tengo permisos, me lo va a pedir
    //??tengo el gps activado?¿
    

    this.platform.pause.subscribe();
    this.platform.resume.subscribe(()=>{this.vuelveAVerse()});
    
    //Tienes GPS activo?
    this.diagnostic.isGpsLocationEnabled().then((disp)=>{
      alert('isGpsLocationEnabled si '+ disp);
      if (!disp)
      {
        this.gpsDesactivado();
      } else 
      {
        alert("GPS ACTIVO");
        Geolocation.getCurrentPosition().then((posicion)=>this.exito(posicion), ()=>this.fracaso());
      }
    }, (e)=>alert('isGpsLocationEnabled error ' + e));
  }

  gpsDesactivado (){
    //LE LLEVO A AJUSTES
    this.diagnostic.switchToLocationSettings();
  }

//mejorar esto, está duplicado en geolocalizaDispositivo
  vuelveAVerse (){
      this.diagnostic.isGpsLocationEnabled().then((disp)=>{
      alert('isGpsLocationEnabled si '+ disp);
      if (!disp){
        this.gpsDesactivado();
      } else {
        Geolocation.getCurrentPosition().then((posicion)=>this.exito(posicion), ()=>this.fracaso());
      }
      },
      (e)=>alert('isGpsLocationEnabled error ' + e));
  }

  exito (posicion:Position){
    //alert("No es posible determinar su ubicación en este dispositivo");
    console.log("Se ha encotrado su posición ");
    console.log("Latitud " + posicion.coords.latitude);
    console.log("Longuitud " + posicion.coords.longitude);
    //this.dibujarPosicion (posicion.coords.latitude, posicion.coords.longitude);
    //this.obtenerTiempoJSONP (posicion.coords.latitude, posicion.coords.longitude);//VERSIÓN JSONP -- EVITAR EL CORS
  }

fracaso (){
    alert("No es posible determinar su ubicación en este dispositivo");
  }


}
