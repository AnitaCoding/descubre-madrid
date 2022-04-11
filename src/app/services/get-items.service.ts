import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetItemsService {
  ruta_servidor_monumentos:string = 'https://cuckoosnestoriginal.com/consultaayto/monumentos.php'
  ruta_servidor_edificios: string = 'https://cuckoosnestoriginal.com/consultaayto/edificios.php';
  ruta_servidor_museos: string = 'https://cuckoosnestoriginal.com/consultaayto/museos.php';
  ruta_servidor_parquesJardines: string = 'https://cuckoosnestoriginal.com/consultaayto/parquesJardines.php';
  ruta_servidor_pInformacionTuristica: string = 'https://cuckoosnestoriginal.com/consultaayto/info_turistica.php';



  constructor() { }

  getAllMonumentos():Promise<Response>{
    return fetch(this.ruta_servidor_monumentos)
  }

  getAllEdificios():Promise<Response>{
    return fetch(this.ruta_servidor_edificios)
  }

  getAllMuseos():Promise<Response>{
    return fetch(this.ruta_servidor_museos)
  }

  getAllParquesJardines():Promise<Response>{
    return fetch(this.ruta_servidor_parquesJardines)
  }
  
  getAllPInformacionTuristica():Promise<Response>{
    return fetch(this.ruta_servidor_pInformacionTuristica)
  }
}
