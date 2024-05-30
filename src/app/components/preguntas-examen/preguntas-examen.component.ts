import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { estadisticaPreguntaDTO } from '../../DTO/estadisticaPreguntaDTO';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Alerta } from '../../DTO/Alerta';
import { AlertaComponent } from "../alerta/alerta.component";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-preguntas-examen',
    standalone: true,
    templateUrl: './preguntas-examen.component.html',
    styleUrl: './preguntas-examen.component.css',
    imports: [CommonModule, AlertaComponent]
})
export class PreguntasExamenComponent {
  @Input() estudiante_id!:number;
  @Input() examen_id!:number;
  alerta: any;
  constructor(private userService:UserService,private sanitizer: DomSanitizer ) { 
  }
  ngOnInit() {
    this.getPreguntasExamen();
    
  }
  estadisticas: estadisticaPreguntaDTO[] = []


  getDescription(descripcion: string) {
    return this.sanitizer.bypassSecurityTrustHtml(descripcion);
  }
  
  getPreguntasExamen() {
    this.userService.getEstadisticasExamen(this.examen_id).subscribe({
      next: (data: any) => {
        if (!data.error) {
          this.estadisticas = data.respuesta
          .filter((estadisticas: any) => estadisticas.cantidad_respondidas > 0)
          .map((estadisticas: any) => ({
            ...estadisticas,
            porcentaje_correctas: (estadisticas.numero_correctas / estadisticas.cantidad_respondidas) * 100
          }));
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
