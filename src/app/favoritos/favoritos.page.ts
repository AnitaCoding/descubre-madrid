import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ComunicarDatosItemService } from '../services/comunicar-datos-item.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  lista_favoritos: Array<Item>
  backLink: string = 'favoritos';
  constructor(public servicio_comunica_datos: ComunicarDatosItemService,
    private storage_service: StorageService) {
    //this.existeLista();
    this.lista_favoritos = new Array<Item>();
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.existeLista();
    this.storage_service.set('BackLink', this.backLink)
    //localStorage.setItem('Back-link', this.backLink);
    console.log('will enter fav')

  }

  ionViewDidLeave(){
    this.lista_favoritos=[];
  }

  async existeLista(){
    //if(localStorage.getItem('lista_favoritos'))
    if(await this.storage_service.get('listaFavoritos')==null/*|| await this.storage_service.get('listaFavoritos').length==0*/)
    {
      alert('añade favoritos')
      //this.storage_service.set('listaFavoritos', JSON.stringify(this.lista_favoritos))
      //this.lista_favoritos= JSON.parse(localStorage.getItem('lista_favoritos'));
    }else{
      this.lista_favoritos = JSON.parse(await this.storage_service.get('listaFavoritos'))
      //localStorage.setItem ('lista_favoritos',JSON.stringify(this.lista_favoritos))
    }
  }

  comunicarDatos(id:string){
    this.lista_favoritos.forEach(item=>{
      if(id == item.id){
        this.servicio_comunica_datos.currentItem = item;
      }
    })
  }

  eliminarFavorito(id:string){
    let i:number = 0;
    if(this.lista_favoritos.length <=1){
      this.storage_service.remove('listaFavoritos')
    }else{
      this.lista_favoritos.forEach(item=>{
        if(item.id == id){
  
          this.lista_favoritos.splice(i,1);
          this.storage_service.set('listaFavoritos', JSON.stringify(this.lista_favoritos))
          //localStorage.setItem('lista_favoritos', JSON.stringify(this.lista_favoritos))
  
        }
        i++;
      })

    }
    
  }

}
