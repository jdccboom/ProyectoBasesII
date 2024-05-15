import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { PreguntaDTO } from '../../DTO/pregunta-dto';

@Component({
  selector: 'app-crear-pregunta',
  standalone: true,
  imports: [FormsModule, CommonModule, QuillModule],
  templateUrl: './crear-pregunta.component.html',
  styleUrl: './crear-pregunta.component.css'
})
export class CrearPreguntaComponent {
  seleccion() {
    if(this.pregunta.es_publica=='Y'){
      this.pregunta.es_publica='N';
    }else{
      this.pregunta.es_publica='Y';
    }
    console.log(this.pregunta.es_publica)
  }
  pregunta: PreguntaDTO;
  tipoPreguntas = ['verdadero-falso', 'ordenar', 'completar', 'emparejar', 'seleccion-multi-unica', 'seleccion-multi-multi'];
  constructor() {
    this.pregunta = new PreguntaDTO();
    this.pregunta.es_publica='N'
  }

  htmlContent: any;
  modulesQuill = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ size: [] }],
    ]
  }

  onChangeEditor(event: any): void {
    if (event.html) {
      this.htmlContent = event.html
    }
  }
  crearPregunta(_t10: NgForm) {
    throw new Error('Method not implemented.');
  }

}
