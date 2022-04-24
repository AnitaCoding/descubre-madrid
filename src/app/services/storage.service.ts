import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public storage: Storage) {
    this.init();    
  }

  async init() {
    await this.storage.create();
  }

  async get(key:string):Promise<string>{
    let result = await this.storage.get(key);
    return result
  }

  set(key: string, value: any):Promise<any> {
    return this.storage.set(key, value);
  }

  async remove(key:string):Promise<void>{
    this.storage.remove(key)
  }
}