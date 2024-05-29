import { Component, Inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-preguntas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-preguntas.component.html',
  styleUrl: './lista-preguntas.component.css'
})
export class ListaPreguntasComponent {

  constructor(private routes: Router, private dialog: MatDialogRef<ListaPreguntasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService:UserService) { }

  component = this.data.component;
  preguntas : any[]=[]
  
  getPreguntas() {
    this.userService.getPreguntas().subscribe({
      next: (data: any) => {
        if (!data.error) {
          console.log(data.respuesta);
          for (let pregunta of data.respuesta){
            pregunta.respuestas_usuario=[]
            this.preguntas.push(pregunta);
          }
          
          console.log(this.preguntas)
        } else {
          alert('El error es: ' + data.respuesta);
        }
      },
      error: (err: any) => {
        alert('El error es: ' + err.respuesta);
      }
    });
  }

  close() {
    this.dialog.close();
  }

}
