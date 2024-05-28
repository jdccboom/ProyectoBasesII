import { Component, Input } from '@angular/core';
import { PreguntaDTO } from '../../../DTO/pregunta-dto';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-ordenar',
  standalone: true,
  imports: [CommonModule,DragDropModule],
  templateUrl: './ordenar.component.html',
  styleUrl: './ordenar.component.css'
})
export class OrdenarComponent {
  
  constructor(){
    this.pregunta=new PreguntaDTO();
  }
  
  @Input() pregunta: PreguntaDTO ;
  @Input() groupName: string="";

  ngOnInit(){
    if(this.pregunta.opciones){
    this.pregunta.opciones=this.shuffle(this.pregunta.opciones);
    }
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pregunta.opciones, event.previousIndex, event.currentIndex);
    this.pregunta.respuestas_usuario = this.pregunta.opciones.map(opcion => opcion.opcion_id);
  }
  
  getLetter(index: number): string {
    const letters = ['a', 'b', 'c', 'd','e','f','h','j','i'];
    return letters[index % letters.length]+".";
  }

  shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}
