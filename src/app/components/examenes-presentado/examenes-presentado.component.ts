import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { estadisticasDTO } from '../../DTO/estadisticasDTO';

@Component({
  selector: 'app-examenes-presentado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './examenes-presentado.component.html',
  styleUrl: './examenes-presentado.component.css'
})
export class ExamenesPresentadoComponent {

  constructor(){

  }

  estadisticas: estadisticasDTO[]=[];

}
