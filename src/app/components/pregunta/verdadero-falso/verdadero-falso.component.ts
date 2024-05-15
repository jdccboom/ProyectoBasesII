import { Component, Input } from '@angular/core';
import { PreguntaDTO } from '../../../DTO/pregunta-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verdadero-falso',
  standalone: true,
  imports: [],
  templateUrl: './verdadero-falso.component.html',
  styleUrl: './verdadero-falso.component.css'
})
export class VerdaderoFalsoComponent {
  constructor(){
    this.pregunta=new PreguntaDTO();
  }

  @Input() pregunta: PreguntaDTO ;
  @Input() groupName: string="";

  seleccion(opcionSeleccionada: string) {
    this.pregunta.respuestasUsuario.push(opcionSeleccionada);
    console.log('Opción seleccionada:', opcionSeleccionada);
  }
}
