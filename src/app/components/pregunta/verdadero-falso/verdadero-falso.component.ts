import { Component, Input } from '@angular/core';
import { PreguntaDTO } from '../../../DTO/pregunta-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verdadero-falso',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './verdadero-falso.component.html',
  styleUrl: './verdadero-falso.component.css'
})
export class VerdaderoFalsoComponent {
  constructor(){
    this.pregunta=new PreguntaDTO();
  }

  @Input() pregunta: PreguntaDTO ;
  @Input() groupName: string="";
  
}
