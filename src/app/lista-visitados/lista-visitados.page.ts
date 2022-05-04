import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ComunicarDatosItemService } from '../services/comunicar-datos-item.service';
import { ItemTypeService } from '../services/item-type.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-lista-visitados',
  templateUrl: './lista-visitados.page.html',
  styleUrls: ['./lista-visitados.page.scss'],
})
export class ListaVisitadosPage implements OnInit {
  itemType: string ='';
  lista_visitados: Array<Item>;
  lista_aux: Array<Item>;
  backLink: string;

  constructor(private itemTypeService:ItemTypeService,
    private service_storage:StorageService,
    public servicio_comunica_datos: ComunicarDatosItemService) {
      this.lista_visitados = new Array<Item>();
      this.lista_aux = new Array<Item>();
     }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.itemType = this.itemTypeService.itemType;
    this.backLink = 'perfil';
    console.log('lista' + this.itemType)
    this.obtenerVisitados();
    console.log('page null')
  }

  ionViewWillLeave(){
    this.lista_visitados = [];
    this.lista_aux = [];
    this.service_storage.set('BackLink', 'lista-visitados')
  }

  async obtenerVisitados(){
    if(await this.service_storage.get('listaVisitados')){
      this.lista_visitados = JSON.parse(await this.service_storage.get('listaVisitados'));
      console.log(this.lista_visitados)
      this.lista_visitados.forEach(item => {
        if(item.tipoItem == this.itemType){
          this.lista_aux.push(item);
        }
      })
    }
  }

  comunicarDatos(id:string){
    this.lista_aux.forEach(item=>{
      if(id == item.id){
        this.servicio_comunica_datos.currentItem = item;
        console.log(item.location.latitude)
      }
    })
  }
}
