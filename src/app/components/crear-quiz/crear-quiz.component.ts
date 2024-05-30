import { Component } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { quizDTO } from '../../DTO/quizDTO';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { PreguntasComponent } from "../preguntas/preguntas.component";
import { ModalService } from '../../services/extService/modal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../services/user/user.service';
import { PopupService } from '../../services/extService/popup.service';

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
  materia_id: any;
  constructor( private routes:Router,private route: ActivatedRoute,private modal:ModalService,
    private sanitizer: DomSanitizer, private userService:UserService,private popup:PopupService){
     this.quiz= new quizDTO();
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
        this.materia_id = +params['materia_id'];
        console.log('Examen ID:', this.materia_id);
      });
  }

  validateFields(): boolean {
    if (!this.quiz.titulo) {
      alert('El título del examen es requerido');
      return false;
    }
    if (!this.quiz.categoria) {
      alert('La categoría es requerida');
      return false;
    }
    if (!this.quiz.descripcion) {
      alert('La descripción es requerida');
      return false;
    }
    if (!this.quiz.maximoPreguntas || this.quiz.maximoPreguntas < 1) {
      alert('El número máximo de preguntas debe ser al menos 1');
      return false;
    }
    if (!this.quiz.numPreguntasEstudiante || this.quiz.numPreguntasEstudiante < 1 || this.quiz.numPreguntasEstudiante > this.quiz.maximoPreguntas) {
      alert('El número de preguntas para el estudiante debe ser válido');
      return false;
    }
    if (!this.quiz.tiempoExamen || this.quiz.tiempoExamen < 1) {
      alert('El tiempo del examen debe ser válido');
      return false;
    }
    if (!this.quiz.fecha) {
      alert('La fecha de presentación es requerida');
      return false;
    }
    for (let pregunta of this.quiz.preguntas) {
      if (!pregunta.porcentaje || pregunta.porcentaje < 0 || pregunta.porcentaje > 100) {
        alert('El porcentaje de cada pregunta debe ser válido');
        return false;
      }
    }
    return true;
  }

  crearQuiz() {
    if (this.validateFields()) {
      // Proceed with the quiz creation
      console.log('Quiz creado exitosamente', this.quiz);
      // You can add your logic to save the quiz data
      this.userService.crearExamen(this.quiz).subscribe({
        next: (data:any) => {
          console.log('Examen creado:', data);
          this.popup.openSnackBar("Examen creado con éxito")
          this.routes.navigate(['/home/inicio']);
        }, 
        error: (err: any) => {
          this.popup.openSnackBar(err.error.respuesta);
          console.log(err.error.respuesta)
        }

      });
    }
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
