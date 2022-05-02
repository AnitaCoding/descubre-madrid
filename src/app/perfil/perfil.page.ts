import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ItemTypeService } from '../services/item-type.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  backLink: string = 'perfil';
  edicionNombre:boolean = false;

  nombreUsuario:string = "Cambia tu nombre";

  nMonumentosVisitados: number;
  nEdificiosVisitados: number;
  nMuseosVisitados: number;
  nParquesVisitados: number;
  nPInfoVisitados: number;
  lista_visitados: Array<Item>;

  constructor(private storage_service:StorageService,
    private itemTypeService:ItemTypeService) {
    this.actualizarNombreUsuario();
   }

  ngOnInit() {

  }

  async ionViewWillEnter(){
    this.obtenerNombreUsuario();
    this.nMonumentosVisitados = 0;
    this.nEdificiosVisitados = 0;
    this.nMuseosVisitados = 0;
    this.nParquesVisitados = 0;
    this.nPInfoVisitados = 0;
    this.lista_visitados = JSON.parse(await this.storage_service.get('listaVisitados'));
    this.storage_service.set('BackLink', this.backLink)    
    this.actualizaNvisitados();

  }

  actualizarNombreUsuario(){
    if(localStorage.getItem('nombre_usuario')){
      this.nombreUsuario = localStorage.getItem('nombre_usuario')
    }
  }

  editarNombre(){
    if(!this.edicionNombre) {
      this.edicionNombre = true;
    }else{
      this.almacenarNombre();
      this.edicionNombre = false;
    };

  }

  almacenarNombre(){
    this.storage_service.set('nombreUsuario', this.nombreUsuario)
  }

  async obtenerNombreUsuario(){
    if(await this.storage_service.get('nombreUsuario') == null){
      this.storage_service.set('nombreUsuario', "Cambia tu nombre");
      this.nombreUsuario = await this.storage_service.get('nombreUsuario');
    }else{
      this.nombreUsuario = await this.storage_service.get('nombreUsuario')
    }
  }

  actualizaItemType(itemType:string){
    this.itemTypeService.itemType = itemType;
    console.log(itemType)
  }

  async actualizaNvisitados(){
    if(await this.storage_service.get('listaVisitados')){
      this.lista_visitados = JSON.parse(await this.storage_service.get('listaVisitados'))
      this.lista_visitados.forEach(item =>{
        switch(item.tipoItem){
          case 'monumentos':
            this.nMonumentosVisitados++;
            break;
          case 'edificios':
            this.nEdificiosVisitados++;
            break;
          case 'museos':
            this.nMuseosVisitados++;
            break;
          case 'parques':
            this.nParquesVisitados++;
            break;
          case 'oficinas de turismo':
            this.nPInfoVisitados++;
            break;
        }
      })
    }

  }
}
