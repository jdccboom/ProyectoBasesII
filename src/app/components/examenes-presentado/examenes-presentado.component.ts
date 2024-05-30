import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { estadisticasDTO } from '../../DTO/estadisticasDTO';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PreguntasExamenComponent } from "../preguntas-examen/preguntas-examen.component";
import { UserService } from '../../services/user/user.service';
import { Alerta } from '../../DTO/Alerta';
import { AlertaComponent } from "../alerta/alerta.component";

@Component({
    selector: 'app-examenes-presentado',
    standalone: true,
    templateUrl: './examenes-presentado.component.html',
    styleUrl: './examenes-presentado.component.css',
    imports: [CommonModule, RouterModule, PreguntasExamenComponent, AlertaComponent]
})
export class ExamenesPresentadoComponent {
  examen_id: any;
  pregunta_id: any;
  estudiante_id!: number;
  mostrarTabla: boolean=true;
  alerta: any;

  constructor(private routes: ActivatedRoute, private userService:UserService) { }

  ngOnInit() {
      this.routes.params.subscribe(params => {
        this.examen_id = +params['examen_id'];
        console.log('Examen ID:', this.examen_id);
      });
      this.getExamenes();
  }
  estadisticas: estadisticasDTO[] = [];

  selecionarEstudiante(id:number){
    this.estudiante_id=id;
    this.mostrarTabla=false;
  }

  verEstadisticas(){
    this.mostrarTabla=false;
  }
  cerrarEstadisticas(){
    this.mostrarTabla=true;
  }


  getExamenes() {
    this.userService.getExamenesPresentados("1").subscribe({
      next: (data: any) => {
        if (!data.error) {
          console.log(data.respuesta);
          this.estadisticas = data.respuesta;
        } else {
          this.alerta= new Alerta(data.respuesta,'danger');
        }
      },
      error: (err: any) => {
        this.alerta= new Alerta(err.error.respuesta,'danger');
      }
    });
  }
}
