import { Component, Input } from '@angular/core';
import { PreguntaDTO } from '../../../DTO/pregunta-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selecion-multi-unica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selecion-multi-unica.component.html',
  styleUrl: './selecion-multi-unica.component.css'
})
export class SelecionMultiUnicaComponent {
  constructor(){
    this.pregunta=new PreguntaDTO();
  }

  @Input() pregunta: PreguntaDTO;
  @Input() groupName: string="";

  seleccion(opcionSeleccionada: any) {
    this.pregunta.respuestas_usuario.push(opcionSeleccionada);
    console.log('Opción seleccionada:', opcionSeleccionada);
  }
}
