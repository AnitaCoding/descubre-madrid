import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ComunicarDatosItemService {

  currentItem: Item;
  constructor() {
    this.currentItem = new Item();
   }
}
