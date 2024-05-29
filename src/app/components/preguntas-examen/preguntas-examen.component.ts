import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { estadisticaPreguntaDTO } from '../../DTO/estadisticaPreguntaDTO';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preguntas-examen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntas-examen.component.html',
  styleUrl: './preguntas-examen.component.css'
})
export class PreguntasExamenComponent {
  @Input() estudiante_id;
  constructor() { 
    this.estudiante_id=0;
  }
  ngOnInit() {
  }
  estadisticas: estadisticaPreguntaDTO[] = []
}
