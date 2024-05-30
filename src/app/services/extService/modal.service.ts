import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListaPreguntasComponent } from '../../components/lista-preguntas/lista-preguntas.component';
import { CrearPreguntaComponent } from '../../components/crear-pregunta/crear-pregunta.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor( private modal:MatDialog) { }

  openListaPreguntas(component: any){
    this.modal.open(ListaPreguntasComponent,{data:{component:component},disableClose:true,width:"800px"})
  }

  openCrearPreguntas(component: any){
    this.modal.open(CrearPreguntaComponent,{data:{component:component},disableClose:true,width:"800px",minHeight:400})
  }
}
