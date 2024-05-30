import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { PreguntaDTO } from '../../DTO/pregunta-dto';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CompletarComponent } from "../pregunta/completar/completar.component";
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupService } from '../../services/extService/popup.service';

@Component({
  selector: 'app-crear-pregunta',
  standalone: true,
  templateUrl: './crear-pregunta.component.html',
  styleUrl: './crear-pregunta.component.css',
  imports: [FormsModule, CommonModule, QuillModule, DragDropModule, CompletarComponent,RouterModule]
})
export class CrearPreguntaComponent {

  constructor(private userService:UserService,private dialog: MatDialogRef<CrearPreguntaComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private popup:PopupService) {
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
    console.log(this.pregunta)
    if (this.pregunta.tipo_pregunta != '' && this.pregunta.descripcion != '' && this.pregunta.opciones.length >= 1) {
        this.userService.crearPregunta(this.pregunta).subscribe({
          next: (data:any) => {
            this.pregunta.pregunta_id=data.pregunta_id;
            this.popup.openSnackBar("Pregunta creada con éxito")
            console.log(this.pregunta)
            this.pregunta.posicion=this.data.component.preguntas.length;
            this.pregunta.porcentaje=1;
            this.data.component.preguntas.push(this.pregunta);
            this.close()
          }, 
          error: (err: any) => {
            this.popup.openSnackBar(err.error.respuesta);
            console.log(err.error.respuesta)
          }
  
        });
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
      this.pregunta.respuesta_correcta[0] = index;
      console.log(this.pregunta.respuesta_correcta)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pregunta.opciones, event.previousIndex, event.currentIndex);
    this.pregunta.respuesta_correcta = this.pregunta.opciones.map(opcion => opcion.opcion_id);

  }

  selecionTipo() {
    this.pregunta.opciones = [];
    this.addAnswerOption()
    this.disableAddAnswer = false;
    if (this.pregunta.tipo_pregunta == 'verdadero-falso') {
      this.mensaje = "Selecione la repuesta correcta";
      this.pregunta.opciones = [];
      this.disableAddAnswer = true;
      this.pregunta.opciones.push({ opcion_id:this.pregunta.opciones.length,descripcion: "Verdadero" });
      this.pregunta.opciones.push({ opcion_id:this.pregunta.opciones.length,descripcion: "Falso" });
    } else if (this.pregunta.tipo_pregunta == 'ordenar') {
      this.mensaje = "Ingrese las opciones en el orden correcto";
      this.pregunta.opciones.push({opcion_id:this.pregunta.opciones.length, descripcion: "" });
    } else if (this.pregunta.tipo_pregunta == 'completar') {
      this.mensaje = "Ingrese la descripcion y recuerda que las palabras que desea que se completen colocarla dentro de doble asterisco (**palabra**)";
      this.disableAddAnswer = true;
    } else if (this.pregunta.tipo_pregunta == 'emparejar') {
      this.pregunta.opciones.push({opcion_id:this.pregunta.opciones.length, descripcion: "" });
      this.mensaje = "Ingrese las opciones que desea emparejar en el orden correcto";
    } else if (this.pregunta.tipo_pregunta == 'seleccion-multi-unica') {
      this.mensaje = "Ingrese las opciones y recuerde selecionar la correcta";
    } else if (this.pregunta.tipo_pregunta == 'seleccion-multi-multi') {
      this.mensaje = "Ingrese las opciones y recuerde selecionar las repuestas correctas correcta";
    }
  }

  seleccionMulti(index: number) {
    if (this.pregunta.respuesta_correcta.includes(index)) {
      this.pregunta.respuesta_correcta = this.pregunta.respuesta_correcta.filter(respuesta => respuesta !== index);
    } else {
      this.pregunta.respuesta_correcta.push(index);
    }
    this.pregunta.respuesta_correcta.sort();
    console.log(this.pregunta.respuesta_correcta)
  }

  changeDescripcion(index: number, descripcion: string) {
    this.pregunta.opciones[index].descripcion = descripcion;
  }

  addAnswerOption() {
    this.pregunta.opciones.push({opcion_id:this.pregunta.opciones.length, descripcion: '' })
  }

  deleteAnswerOption(index: number) {
    this.pregunta.opciones.splice(index, 1);
    let i=0;
    for(let option of this.pregunta.opciones){
      option.opcion_id = i;
      i++;
    }
    for(let i =0; i < this.pregunta.respuesta_correcta.length; i++){
      if(this.pregunta.respuesta_correcta[i]==index){
        this.pregunta.respuesta_correcta.splice(this.pregunta.respuesta_correcta.indexOf(i),1);
      }
      if(this.pregunta.respuesta_correcta[i]>index){
        this.pregunta.respuesta_correcta[i]--;
      }
    }
    console.log(this.pregunta.respuesta_correcta)

  }
  
  close() {
    this.dialog.close();
  }
}
