import { Component, Input } from '@angular/core';
import { PreguntaDTO } from '../../DTO/pregunta-dto';
import { CommonModule } from '@angular/common';
import { SelecionMultiUnicaComponent } from "../pregunta/selecion-multi-unica/selecion-multi-unica.component";
import { SelecionMultiMultiComponent } from '../pregunta/selecion-multi-multi/selecion-multi-multi.component';
import { VerdaderoFalsoComponent } from "../pregunta/verdadero-falso/verdadero-falso.component";
import { OrdenarComponent } from "../pregunta/ordenar/ordenar.component";
import { DomSanitizer } from '@angular/platform-browser';
import { PreguntasService } from '../../services/auth/preguntas.service';
import { CompletarComponent } from "../pregunta/completar/completar.component";

@Component({
  selector: 'app-preguntas',
  standalone: true,
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.css',
  imports: [SelecionMultiUnicaComponent, SelecionMultiMultiComponent, CommonModule, VerdaderoFalsoComponent, OrdenarComponent, CompletarComponent]
})
export class PreguntasComponent {
  constructor(private sanitizer: DomSanitizer, private preguntasService: PreguntasService) {
    this.preguntas = [
      new PreguntaDTO(1, 1, "<strong>Cuanto es 2+2?</strong>", "seleccion-multi-unica",
        [{ opcion_id: "1", pregunta_id: "1", descripcion: "2" },
        { opcion_id: "2", pregunta_id: "1", descripcion: "1" },
        { opcion_id: "3", pregunta_id: "1", descripcion: "4" },
        { opcion_id: "4", pregunta_id: "1", descripcion: "5" }], ["3"]),
      new PreguntaDTO(2, 1, "<strong>Es verdadero afirmar que 2+6 = 8?</strong>", "verdadero-falso",
        [{ opcion_id: "1", pregunta_id: "2", descripcion: "1" },
        { opcion_id: "2", pregunta_id: "2", descripcion: "0" },], ["1"]),
      new PreguntaDTO(3, 1, "<strong>Es multiplo de 3?</strong>", "seleccion-multi-multi",
        [{ opcion_id: "1", pregunta_id: "3", descripcion: "2" },
        { opcion_id: "2", pregunta_id: "3", descripcion: "1" },
        { opcion_id: "3", pregunta_id: "3", descripcion: "9" },
        { opcion_id: "4", pregunta_id: "3", descripcion: "6" }], ["3", "4"]),
      new PreguntaDTO(4, 1, "<p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(33, 37, 41);\">Ordena las repuestas?</strong></p><p><strong>a - &quot;Es múltiplo de 7&quot;</strong></p><p><strong>b - &quot;2+2=&quot;</strong></p><p><strong>c - &quot;4+7=&quot;</strong></p><p><strong>d - &quot;3*3=&quot;</strong></p><p></p>", "ordenar",
        [{ opcion_id: "1", pregunta_id: "4", descripcion: "11" },
        { opcion_id: "2", pregunta_id: "4", descripcion: "4" },
        { opcion_id: "3", pregunta_id: "4", descripcion: "9" },
        { opcion_id: "4", pregunta_id: "4", descripcion: "14" }], ["4", "2", "1", "3"]),
      new PreguntaDTO(5, 1, "<strong>Complete las opciones correctas</strong>", "completar",
        [{
          opcion_id: "1", pregunta_id: "5", descripcion: "John likes **playing** football with **his** friends. Jane also enjoys **going** to matches with **her** friends and they often **go** **out** together with **their** families."
        },], ["playing", "his", "going", "her", "go", "out", "their"]),
      new PreguntaDTO(6, 1, '<p><strong style="color: var(--tw-prose-bold);">Relacione los siguientes elementos:</strong></p><p><strong>a. Perro</strong></p><p><strong>b. Gato</strong></p><p><strong>c. Caballo</strong></p><p><strong>d. Pájaro</strong></p><p></p>', "emparejar",
        [{ opcion_id: "1", pregunta_id: "6", descripcion: "_____ es un mamífero que a menudo es considerado como el mejor amigo del hombre" }, 
        { opcion_id: "2", pregunta_id: "6", descripcion: "_____ es un ave que tiene la capacidad de volar.      " },
        { opcion_id: "3", pregunta_id: "6", descripcion: "_____ es un felino conocido por su agilidad y elegancia." },
        { opcion_id: "4", pregunta_id: "6", descripcion: "_____ es un animal de granja usado para montar y trabajar." }
       ], 
        ["1", "3", "4", "2"])
    ];
  }
  @Input() preguntas: PreguntaDTO[];

  getDescription(descripcion: string) {
    return this.sanitizer.bypassSecurityTrustHtml(descripcion);
  }

  imprimirRespuestas() {
    console.log(this.preguntas);
    for (let pregunta of this.preguntas)
      console.log(pregunta.respuestasUsuario);
  }

  getPreguntas() {
    this.preguntasService.getPreguntas("").subscribe({
      next: (data: any) => {
        if (!data.error) {
          console.log(data.respuesta);
          for (let pregunta of data.respuesta) {
            this.sanitizer.bypassSecurityTrustHtml(pregunta.texto)
          }
          ///this.routes.navigate(['registrarProfesor']);
        } else {
          alert('El error es: ' + data.respuesta);
        }
      },
      error: (err: any) => {
        alert('El error es: ' + err.respuesta);
      }

    });
  }
}
