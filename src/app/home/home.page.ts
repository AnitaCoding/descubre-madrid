import { Component } from '@angular/core';
import { ItemTypeService } from '../services/item-type.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private itemTypeService: ItemTypeService) {

  }

  actualizaItemType(itemType:string){
    this.itemTypeService.itemType = itemType;
    console.log(itemType)
  }

}
