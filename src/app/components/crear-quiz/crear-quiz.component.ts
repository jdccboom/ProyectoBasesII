import { Component } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { quizDTO } from '../../DTO/quizDTO';
import { Router } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { PreguntasComponent } from "../preguntas/preguntas.component";

@Component({
    selector: 'app-crear-quiz',
    standalone: true,
    templateUrl: './crear-quiz.component.html',
    styleUrl: './crear-quiz.component.css',
    imports: [FormsModule, CommonModule, QuillModule, PreguntasComponent]
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
  constructor( private routes:Router){
     this.quiz= new quizDTO();
  }

  crearQuiz(formQuiz:NgForm) {
    console.log(formQuiz.value)
  }

  onChangeEditor(event:any): void{
    if(event.html){
      this.htmlContent= event.html
    }
  }

}
