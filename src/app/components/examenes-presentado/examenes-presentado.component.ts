import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { estadisticasDTO } from '../../DTO/estadisticasDTO';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PreguntasExamenComponent } from "../preguntas-examen/preguntas-examen.component";

@Component({
    selector: 'app-examenes-presentado',
    standalone: true,
    templateUrl: './examenes-presentado.component.html',
    styleUrl: './examenes-presentado.component.css',
    imports: [CommonModule, RouterModule, PreguntasExamenComponent]
})
export class ExamenesPresentadoComponent {
  examen_id: any;
  pregunta_id: any;
  mostrarTabla: boolean=true;

  constructor(private routes: ActivatedRoute) { }

  ngOnInit() {
      this.routes.params.subscribe(params => {
        this.examen_id = +params['examen_id'];
        console.log('Examen ID:', this.examen_id);
      });
  }
  estadisticas: estadisticasDTO[] = [];

  selecionarEstudiante(id:number){
    this.mostrarTabla=true;
  }
}
