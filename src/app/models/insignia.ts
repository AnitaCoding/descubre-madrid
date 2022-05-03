import { ElementRef} from '@angular/core';
import { Chart } from 'chart.js';

export class Insignia {
    titulo: Array<string>;
    tituloActual: string;
    nombreCanvas: ElementRef;
    nombreChart: Chart;
    nRealizados: number;
    nivel:number;

    constructor(){
        this.titulo = new Array<string>();
        this.tituloActual = '';
        //this.nombreCanvas = new ElementRef();
        this.nRealizados = 0;
        this.nivel = 0;
    }
}