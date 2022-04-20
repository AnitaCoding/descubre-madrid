import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ComunicarDatosItemService } from '../services/comunicar-datos-item.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  lista_favoritos: Array<Item>
  backLink: string = 'favoritos';
  constructor(public servicio_comunica_datos: ComunicarDatosItemService) {
    this.existeLista();
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.existeLista();
    localStorage.setItem('Back-link', this.backLink);

  }

  existeLista(){
    if(localStorage.getItem('lista_favoritos')){
      this.lista_favoritos= JSON.parse(localStorage.getItem('lista_favoritos'));
    }else{
      localStorage.setItem ('lista_favoritos',JSON.stringify(this.lista_favoritos))
    }
  }

  comunicarDatos(id:string){
    this.lista_favoritos.forEach(item=>{
      if(id == item.id){
        this.servicio_comunica_datos.currentItem = item;
        console.log(this.servicio_comunica_datos.currentItem.title);
      }
    })
  }

  eliminarFavorito(id:string){
    let i:number = 0;
    this.lista_favoritos.forEach(item=>{
      if(item.id == id){

        this.lista_favoritos.splice(i,1);
        console.log(this.lista_favoritos)
        localStorage.setItem('lista_favoritos', JSON.stringify(this.lista_favoritos))

      }
      i++;
    })
  }

}
