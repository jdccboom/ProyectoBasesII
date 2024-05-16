import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { PreguntaDTO } from '../../DTO/pregunta-dto';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CompletarComponent } from "../pregunta/completar/completar.component";

@Component({
  selector: 'app-crear-pregunta',
  standalone: true,
  templateUrl: './crear-pregunta.component.html',
  styleUrl: './crear-pregunta.component.css',
  imports: [FormsModule, CommonModule, QuillModule, DragDropModule, CompletarComponent]
})
export class CrearPreguntaComponent {

  constructor() {
    this.pregunta = new PreguntaDTO();
    this.pregunta.es_publica = 'N'
  }

  @Input() pregunta: PreguntaDTO;
  tipoPreguntas = ['verdadero-falso', 'ordenar', 'completar', 'emparejar', 'seleccion-multi-unica', 'seleccion-multi-multi'];
  htmlContent: any;
  descripcion: any;
  mensaje: string = "";
  disableAddAnswer = true;
  radioVF: any;
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

  crearPregunta() {
    if (this.pregunta.tipo_pregunta != '' && this.pregunta.descripcion != '' && this.pregunta.opciones.length >= 1) {
      console.log(this.pregunta)
    }
  }

  seleccion() {
    if (this.pregunta.es_publica == 'Y') {
      this.pregunta.es_publica = 'N';
    } else {
      this.pregunta.es_publica = 'Y';
    }
    console.log(this.pregunta.es_publica)
  }

  seleccionCorrecta(index: number) {
    if (index == 0) {
      this.pregunta.respuestaCorrecta[0] = 1;
    } else {
      this.pregunta.respuestaCorrecta[0] = 0;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pregunta.opciones, event.previousIndex, event.currentIndex);
  }

  selecionTipo() {
    this.pregunta.opciones = [];
    this.pregunta.opciones.push({ descripcion: "" });
    this.disableAddAnswer = false;
    if (this.pregunta.tipo_pregunta == 'verdadero-falso') {
      this.mensaje = "Selecione la repuesta correcta";
      this.pregunta.opciones = [];
      this.disableAddAnswer = true;
      this.pregunta.opciones.push({ descripcion: "Verdadero" });
      this.pregunta.opciones.push({ descripcion: "Falso" });
    } else if (this.pregunta.tipo_pregunta == 'ordenar') {
      this.mensaje = "Ingrese las opciones en el orden correcto";
      this.pregunta.opciones.push({ descripcion: "" });
    } else if (this.pregunta.tipo_pregunta == 'completar') {
      this.mensaje = "Ingrese la descripcion y recuerda que las palabras que desea que se completen colocarla dentro de doble asterisco (**palabra**)";
      this.disableAddAnswer = true;
    } else if (this.pregunta.tipo_pregunta == 'emparejar') {
      this.mensaje = "Ingrese las opciones que desea emparejar en el orden correcto";
    } else if (this.pregunta.tipo_pregunta == 'seleccion-multi-unica') {
      this.mensaje = "Ingrese las opciones y recuerde selecionar la correcta";
    } else if (this.pregunta.tipo_pregunta == 'seleccion-multi-multi') {
      this.mensaje = "Ingrese las opciones y recuerde selecionar las repuestas correctas correcta";
    }
  }

  seleccionMulti(index: number) {
    if (this.pregunta.respuestaCorrecta.includes(index)) {
      this.pregunta.respuestaCorrecta = this.pregunta.respuestaCorrecta.filter(respuesta => respuesta !== index);
    } else {
      this.pregunta.respuestaCorrecta.push(index);
    }
    this.pregunta.respuestaCorrecta.sort();
    console.log(this.pregunta.respuestaCorrecta)
  }

  changeDescripcion(index: number, descripcion: string) {
    this.pregunta.opciones[index].descripcion = descripcion;
  }

  addAnswerOption() {
    this.pregunta.opciones.push({ descripcion: '' })
  }

  deleteAnswerOption(index: number) {
    this.pregunta.opciones.splice(index, 1);
  }
}
