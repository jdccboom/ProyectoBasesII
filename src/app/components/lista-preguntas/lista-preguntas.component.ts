import { Component, Inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { PreguntaDTO } from '../../DTO/pregunta-dto';
import { quizDTO } from '../../DTO/quizDTO';
import { AlertaComponent } from "../alerta/alerta.component";
import { Alerta } from '../../DTO/Alerta';

@Component({
    selector: 'app-lista-preguntas',
    standalone: true,
    templateUrl: './lista-preguntas.component.html',
    styleUrl: './lista-preguntas.component.css',
    imports: [CommonModule, AlertaComponent]
})
export class ListaPreguntasComponent {
  alerta: any;

  constructor(private routes: Router, private dialog: MatDialogRef<ListaPreguntasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService:UserService,private sanitizer: DomSanitizer) { }

  component = this.data.component;
  preguntas : any[]=[]
  ngOnInit() {
    console.log(this.component);
    this.getPreguntas();
  }
  selecion(pregunta:PreguntaDTO){
    console.log(this.component.preguntas);
    if (!this.component.preguntas.some((p: { pregunta_id: any; }) => p.pregunta_id === pregunta.pregunta_id)) {
      pregunta.posicion=this.component.preguntas.length;
      pregunta.porcentaje=1;
      this.component.preguntas.push(pregunta);
      this.close();
    } else {
      this.alerta= new Alerta('Pregunta already exists in the list.','danger');
    }
  }

  getDescription(descripcion: string) {
    return this.sanitizer.bypassSecurityTrustHtml(descripcion);
  }
  getPreguntas() {
    this.userService.getPreguntasProfesor("1").subscribe({
      next: (data: any) => {
        if (!data.error) {
          console.log(data.respuesta);
          for (let pregunta of data.respuesta){
            if (!this.component.preguntas.some((p: { pregunta_id: any; }) => p.pregunta_id === pregunta.pregunta_id)) {
              this.preguntas.push(pregunta);
            }
          }
        } else {
          this.alerta= new Alerta(data.respuesta,'danger');
        }
      },
      error: (err: any) => {
        this.alerta= new Alerta(err.error.respuesta,'danger');
      }
    });
  }
  alertaView(){
    if(this.preguntas.length<1){
      this.alerta= new Alerta("No hay mas preguntas disponibles",'danger');
      return true;
    }
    return false
  }
  close() {
    this.dialog.close();
  }

}
