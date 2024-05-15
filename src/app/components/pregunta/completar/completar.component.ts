import { Component, Input } from '@angular/core';
import { PreguntaDTO } from '../../../DTO/pregunta-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-completar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './completar.component.html',
  styleUrl: './completar.component.css'
})
export class CompletarComponent {
  incrementarContador() {
    this.contador++;
}
  index: any;
  constructor() {
    this.pregunta = new PreguntaDTO();
  }

  @Input() pregunta: PreguntaDTO;
  @Input() groupName: string = "";

  comboBoxWords: string[] = [];
  contador: number = 0;
  posiciones: any[] = [];

  ngOnInit(): void {
    this.comboBoxWords = this.getRamdonComboBoxWords();
    this.pregunta.respuestasUsuario = this.comboBoxWords.map(opcion => opcion = "");
    this.getPosiciones();
  }
  get words(): string[] {
    return this.pregunta.opciones[0].descripcion.split(' ');
  }

  getRamdonComboBoxWords(): string[] {
    const randomWords = this.words.filter(word => word.startsWith('**') && word.endsWith('**'))
      .map(word => ({ word, index: Math.floor(Math.random() * this.words.length) }))
      .sort((a, b) => a.index - b.index)
      .map(item => item.word);
    return randomWords.map(word => this.getWord(word));
  }

  getStaticWords(): string[] {
    return this.words.filter(word => !word.startsWith('**') && !word.endsWith('**'));
  }

  getPosiciones(): void{
    this.posiciones = this.words
    .map((word, index) =>  index)
    .filter(index => this.comboBoxWords.includes(this.getWord(this.words[index])));
  }

  getWord(word: string): string {
    return word.startsWith('**') && word.endsWith('**') ? word.replace('**', '').replace('**', '') : word;
  }

  isComboBox(word: string): boolean {
    return word.startsWith('**') && word.endsWith('**') ? true : false;
  }
}
