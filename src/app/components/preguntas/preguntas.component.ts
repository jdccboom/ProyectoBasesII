import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PreguntaDTO } from '../../DTO/pregunta-dto';
import { CommonModule } from '@angular/common';
import { SelecionMultiUnicaComponent } from "../pregunta/selecion-multi-unica/selecion-multi-unica.component";
import { SelecionMultiMultiComponent } from '../pregunta/selecion-multi-multi/selecion-multi-multi.component';
import { VerdaderoFalsoComponent } from "../pregunta/verdadero-falso/verdadero-falso.component";
import { OrdenarComponent } from "../pregunta/ordenar/ordenar.component";
import { DomSanitizer } from '@angular/platform-browser';
import { CompletarComponent } from "../pregunta/completar/completar.component";
import { HomeComponent } from '../home/home.component';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from '../../services/extService/popup.service';

@Component({
  selector: 'app-preguntas',
  standalone: true,
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.css',
  imports: [SelecionMultiUnicaComponent, SelecionMultiMultiComponent, CommonModule, VerdaderoFalsoComponent, OrdenarComponent, CompletarComponent]
})
export class PreguntasComponent implements OnInit, OnDestroy{

  examen_id: any;
  tiempoTrancurrido: string = '00:00:00';
  private timer: any;
  private startTime!: Date;
  private maxTime: number = 1; // Maximum time in seconds (e.g., 1 hour)
  private timeElapsed: number = 0; // Time elapsed in seconds

  constructor(private sanitizer: DomSanitizer, private home:HomeComponent, private userService: UserService,private routesA: ActivatedRoute,
     private popup:PopupService, private routes:Router) {
    this.routesA.params.subscribe(params=>{
      this.examen_id = params['examen_id'];
    });
    this.preguntas=[];
    this.getPreguntas();
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }
  ngOnInit() {
    this.startTime = new Date();
    this.timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - this.startTime.getTime();
      this.timeElapsed = Math.floor(distance / 1000);

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.tiempoTrancurrido = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;

      // Check if the maximum time is exceeded
      if (this.timeElapsed >= this.maxTime*60) {
        this.finishExam();
      }
    }, 1000);
  }
  @Input() preguntas: PreguntaDTO[];
  getDescription(descripcion: string) {
    return this.sanitizer.bypassSecurityTrustHtml(descripcion);
  }

  pad(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }

  finishExam() {
    clearInterval(this.timer);
    this.saveElapsedTime();
    this.popup.openSnackBar('Tiempo máximo alcanzado. El examen ha finalizado.');
    setTimeout(() => {
      this.routes.navigate(['/home/inicio']); // Replace with your actual path
    }, 3000);
    
    clearInterval(this.timer);

    // Optionally, you can redirect or disable further inputs here
  }

  saveElapsedTime() {
    // Logic to save the elapsed time
    console.log('Elapsed time saved:', this.tiempoTrancurrido);
  }

  imprimirRespuestas() {
    console.log(this.preguntas);
    for (let pregunta of this.preguntas){
      console.log(pregunta.respuestas_usuario);
    }
  }

  terminarExamen(){
    clearInterval(this.timer);
  }

  getPreguntas() {
    this.userService.getPreguntasProfesor("1").subscribe({
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

  
    // this.preguntas = [
    //   new PreguntaDTO(1, 1, "<strong>Cuanto es 2+2?</strong>", "seleccion-multi-unica",
    //     [{ opcion_id: "1", pregunta_id: "1", descripcion: "2" },
    //     { opcion_id: "2", pregunta_id: "1", descripcion: "1" },
    //     { opcion_id: "3", pregunta_id: "1", descripcion: "4" },
    //     { opcion_id: "4", pregunta_id: "1", descripcion: "5" }], ["3"]),
    //   new PreguntaDTO(2, 1, "<strong>Es verdadero afirmar que 2+6 = 8?</strong>", "verdadero-falso",
    //     [{ opcion_id: "1", pregunta_id: "2", descripcion: "1" },
    //     { opcion_id: "2", pregunta_id: "2", descripcion: "0" },], ["1"]),
    //   new PreguntaDTO(3, 1, "<strong>Es multiplo de 3?</strong>", "seleccion-multi-multi",
    //     [{ opcion_id: "1", pregunta_id: "3", descripcion: "2" },
    //     { opcion_id: "2", pregunta_id: "3", descripcion: "1" },
    //     { opcion_id: "3", pregunta_id: "3", descripcion: "9" },
    //     { opcion_id: "4", pregunta_id: "3", descripcion: "6" }], ["3", "4"]),
    //   new PreguntaDTO(4, 1, "<p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(33, 37, 41);\">Ordena las repuestas?</strong></p><p><strong>a - &quot;Es múltiplo de 7&quot;</strong></p><p><strong>b - &quot;2+2=&quot;</strong></p><p><strong>c - &quot;4+7=&quot;</strong></p><p><strong>d - &quot;3*3=&quot;</strong></p><p></p>", "ordenar",
    //     [{ opcion_id: "1", pregunta_id: "4", descripcion: "11" },
    //     { opcion_id: "2", pregunta_id: "4", descripcion: "4" },
    //     { opcion_id: "3", pregunta_id: "4", descripcion: "9" },
    //     { opcion_id: "4", pregunta_id: "4", descripcion: "14" }], ["4", "2", "1", "3"]),
    //   new PreguntaDTO(5, 1, "<strong>Complete las opciones correctas</strong>", "completar",
    //     [{
    //       opcion_id: "1", pregunta_id: "5", descripcion: "John likes **playing** football with **his** friends. Jane also enjoys **going** to matches with **her** friends and they often **go** **out** together with **their** families."
    //     },], ["playing", "his", "going", "her", "go", "out", "their"]),
    //   new PreguntaDTO(6, 1, '<p><strong style="color: var(--tw-prose-bold);">Relacione los siguientes elementos:</strong></p><p><strong>a. Perro</strong></p><p><strong>b. Gato</strong></p><p><strong>c. Caballo</strong></p><p><strong>d. Pájaro</strong></p><p></p>', "emparejar",
    //     [{ opcion_id: "1", pregunta_id: "6", descripcion: "_____ es un mamífero que a menudo es considerado como el mejor amigo del hombre" }, 
    //     { opcion_id: "2", pregunta_id: "6", descripcion: "_____ es un ave que tiene la capacidad de volar.      " },
    //     { opcion_id: "3", pregunta_id: "6", descripcion: "_____ es un felino conocido por su agilidad y elegancia." },
    //     { opcion_id: "4", pregunta_id: "6", descripcion: "_____ es un animal de granja usado para montar y trabajar." }
    //    ], 
    //     ["1", "3", "4", "2"])
    // ];
}
