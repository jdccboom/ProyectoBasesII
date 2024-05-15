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
    if (this.pregunta.respuestasUsuario.includes(index)) {
      this.pregunta.respuestasUsuario = this.pregunta.respuestasUsuario.filter(respuesta => respuesta !== index);
    } else {
      this.pregunta.respuestasUsuario.push(index);
    }
    this.pregunta.respuestasUsuario.sort();
    console.log(this.pregunta.respuestasUsuario)
  }

}
