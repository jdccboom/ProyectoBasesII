import { Component } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { quizDTO } from '../../DTO/quizDTO';
import { Router, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { PreguntasComponent } from "../preguntas/preguntas.component";
import { ModalService } from '../../services/extService/modal.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-crear-quiz',
    standalone: true,
    templateUrl: './crear-quiz.component.html',
    styleUrl: './crear-quiz.component.css',
    imports: [FormsModule, CommonModule, QuillModule, PreguntasComponent,RouterModule]
})
export class CrearQuizComponent {
  categories = ['General Knowledge', 'Films', 'Science & Nature', 'Sports', 'Geography', 'History', 'Books', 'Quizzes'];
  htmlContent:any;
  modulesQuill={
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ size: [] }],
    ]
  }
  quiz: quizDTO;
  constructor( private routes:Router,private modal:ModalService,private sanitizer: DomSanitizer){
     this.quiz= new quizDTO();
  }

  crearQuiz() {
    console.log(this.quiz)
  }

  onChangeEditor(event:any): void{
    if(event.html){
      this.htmlContent= event.html
    }
  }

  deletePregunta(i:number){
    this.quiz.preguntas.splice(i,1)
  }

  getDescription(descripcion: string) {
    return this.sanitizer.bypassSecurityTrustHtml(descripcion);
  }

  openModalLista(){
    this.modal.openListaPreguntas(this.quiz);
  }
  openModalCrearPregunta(){
    this.modal.openCrearPreguntas(this.quiz);
  }
}
