import { Component, Input } from '@angular/core';
import { PreguntaDTO } from '../../../DTO/pregunta-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selecion-multi-multi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selecion-multi-multi.component.html',
  styleUrl: './selecion-multi-multi.component.css'
})
export class SelecionMultiMultiComponent {
  constructor(){
    this.pregunta=new PreguntaDTO();
  }

  @Input() pregunta: PreguntaDTO ;
  @Input() groupName: string="";

  seleccion(index: number) {
    if (this.pregunta.respuestas_usuario.includes(index)) {
      this.pregunta.respuestas_usuario = this.pregunta.respuestas_usuario.filter(respuesta => respuesta !== index);
    } else {
      this.pregunta.respuestas_usuario.push(index);
    }
    this.pregunta.respuestas_usuario.sort();
    console.log(this.pregunta.respuestas_usuario)
  }

}
