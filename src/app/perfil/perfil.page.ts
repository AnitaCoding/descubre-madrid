import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  nombreUsuario:string = "Tu nombre";

  nMonumentosVisitados: number;
  nEdificiosVisitados: number;
  nMuseosVisitados: number;
  nParquesVisitados: number;
  nPInfoVisitados: number;
  lista_visitados: Array<Array<Item>>;

  constructor(private storage_service:StorageService) {
    this.actualizarNombreUsuario();
   }

  ngOnInit() {

  }

  async ionViewWillEnter(){
    this.lista_visitados = JSON.parse(await this.storage_service.get('listaVisitados'));

    //this.lista_visitados = JSON.parse(localStorage.getItem('lista_visitados'));
    
    this.nMonumentosVisitados = this.lista_visitados.length;
    this.nEdificiosVisitados = this.lista_visitados.length;
    this.nMuseosVisitados = this.lista_visitados.length;
    this.nParquesVisitados = this.lista_visitados.length;
    this.nPInfoVisitados = this.lista_visitados.length;

  }

  actualizarNombreUsuario(){
    if(localStorage.getItem('nombre_usuario')){
      this.nombreUsuario = localStorage.getItem('nombre_usuario')
    }
  }

  editarNombre(){
    let nombre:string;
    if(localStorage.getItem('nombre_usuario')){

      //TODO:ojo a esto, crear input y controlarlo con booleano

    }else{
      localStorage.setItem('nombre_usuario', nombre)
    }
  }
}
