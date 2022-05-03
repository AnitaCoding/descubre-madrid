import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Insignia } from '../models/insignia';

import { Chart, registerables } from 'chart.js';
import { Item } from '../models/item';
import { StorageService } from '../services/storage.service';
Chart.register(...registerables);


@Component({
  selector: 'app-insignias',
  templateUrl: './insignias.page.html',
  styleUrls: ['./insignias.page.scss'],
})
export class InsigniasPage implements OnInit {

  nivel1: number = 10;
  nivel2: number = 50;
  nivel3: number = 100;

  monumentosInsignia: Insignia;
  edificiosInsignia: Insignia;
  museosInsignia: Insignia;
  parquesInsignia: Insignia;
  pInfoInsignia: Insignia;
  todosInsignia: Insignia;

  monumentosChart: Chart;
  edificiosChart: Chart;
  museosChart: Chart;
  parquesChart: Chart;
  pInfoChart: Chart;
  todosChart: Chart;

  arrayInsignias: Array<Insignia>;

  @ViewChild('monumentosCanvas') private monumentosCanvas: ElementRef;
  @ViewChild('edificiosCanvas') private edificiosCanvas: ElementRef;
  @ViewChild('museosCanvas') private museosCanvas: ElementRef;
  @ViewChild('parquesCanvas') private parquesCanvas: ElementRef;
  @ViewChild('pInfoCanvas') private pInfoCanvas: ElementRef;
  @ViewChild('todosCanvas') private todosCanvas: ElementRef;

  


  lista_visitados: Array<Item>;


  constructor(private storage_service:StorageService) {
    this.monumentosInsignia =  new Insignia();
    this.edificiosInsignia = new Insignia();
    this.museosInsignia = new Insignia();
    this.parquesInsignia = new Insignia();
    this.pInfoInsignia = new Insignia();
    this.todosInsignia = new Insignia();

    this.lista_visitados = new Array<Item>();
    this.arrayInsignias = new Array<Insignia>();
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.generarInsignias();
  }
  async obtenerVisitados(){
    let lista_aux:Array<Item>;
    if(await this.storage_service.get('listaVisitados')){
      lista_aux = JSON.parse(await this.storage_service.get('listaVisitados'));
    }
    return lista_aux;

  }


  async generarInsignias() {
    let lugaresVisitados = await this.obtenerVisitados();

    this.setearInsignias();

    if(lugaresVisitados == undefined){

      this.arrayInsignias.forEach(r => r.nRealizados = 0)
      
    }else{
     
      this.monumentosInsignia.nRealizados = lugaresVisitados.filter(item => item.tipoItem == 'monumentos').length;
      this.edificiosInsignia.nRealizados = lugaresVisitados.filter(item => item.tipoItem == 'edificios').length;
      this.museosInsignia.nRealizados = lugaresVisitados.filter(item => item.tipoItem == 'museos').length;
      this.parquesInsignia.nRealizados = lugaresVisitados.filter(item => item.tipoItem == 'parques').length;
      this.pInfoInsignia.nRealizados = lugaresVisitados.filter(item => item.tipoItem == 'oficinas de turismo').length;
      this.todosInsignia.nRealizados = lugaresVisitados.length;

    }

    this.arrayInsignias.forEach(r => r.nivel = this.setearNivel(r.nRealizados));
    this.setearTituloActual();

    this.arrayInsignias.forEach(r => this.crearInsignias(r.nombreChart, r.nombreCanvas, r.nRealizados) );
    //this.crearInsignias(this.doughnutChart, this.doughnutCanvas, this.zumosInsignia.nRealizados);
  }

  setearNivel(n: number):number{
    let nivel: number;
    if(n<this.nivel3 && n<this.nivel2&&n<this.nivel1){
      nivel = this.nivel1;
    }else if (n < this.nivel3 && n < this.nivel2 && n > this.nivel1){
      nivel = this.nivel2;
    } else if(n<this.nivel3 && n > this.nivel2){
      nivel = this.nivel3
    }else{
      nivel = n;
    }
    return nivel;
  }

  setearTituloActual(){
    this.arrayInsignias.forEach(item => {
      if(item.nivel == this.nivel1){
        item.tituloActual = item.titulo[0];
      }else if(item.nivel == this.nivel2){
        item.tituloActual = item.titulo[1];
      }else if(item.nivel == this.nivel3){
        item.tituloActual = item.titulo[2];
      }else{
        item.tituloActual = item.titulo[3]
      }
    })
  }

  crearInsignias(chartElement:Chart, chartCanvas:ElementRef, n:number){
    let nivel = this.setearNivel(n);
    chartElement = new Chart(chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [n,nivel-n],
          backgroundColor: [
            'rgb(0, 61, 246)',
            'rgba(0, 61, 246, 0.4)'
          ],
          hoverBackgroundColor: [
            'rgba(0, 61, 246, 0.8)',
            'rgba(0, 61, 246, 0.2)'
          ]
        }]
      }
      
    });
  }

  setearInsignias(){

    this.monumentosInsignia.titulo = ['Escultor en prácticas', 'Escultor novel', 'Escultor experto', 'Escultor legendario'];
    this.monumentosInsignia.nombreCanvas = this.monumentosCanvas;
    this.monumentosInsignia.nombreChart = this.monumentosChart;

    this.edificiosInsignia.titulo = ['Arquitecto en prácticas','Arquitecto novel', 'Arquitecto experto', 'Arquitecto legendario'];
    this.edificiosInsignia.nombreCanvas = this.edificiosCanvas;
    this.edificiosInsignia.nombreChart = this.edificiosChart;

    this.museosInsignia.titulo = ['Artista en prácticas','Artista novel', 'Artista experto', 'Artista legendario'];
    this.museosInsignia.nombreCanvas = this.museosCanvas;
    this.museosInsignia.nombreChart = this.museosChart;

    this.parquesInsignia.titulo = ['Turista en prácticas','Turista novel', 'Turista experto', 'Turista legendario'];
    this.parquesInsignia.nombreCanvas = this.parquesCanvas;
    this.parquesInsignia.nombreChart = this.parquesChart;

    this.pInfoInsignia.titulo = ['Guía turístico en prácticas','Guía turístico novel', 'Guía turístico experto', 'Guía turístico legendario'];
    this.pInfoInsignia.nombreCanvas = this.pInfoCanvas;
    this.pInfoInsignia.nombreChart = this.pInfoChart;

    this.todosInsignia.titulo = ['Madrileño en prácticas','Madrileño novel', 'Madrileño experto', 'Madrileño legendario'];
    this.todosInsignia.nombreCanvas = this.todosCanvas;
    this.todosInsignia.nombreChart = this.todosChart;

    this.arrayInsignias = [this.monumentosInsignia, this.edificiosInsignia, this.museosInsignia, this.parquesInsignia, this.pInfoInsignia, this.todosInsignia]

    

  }

}
