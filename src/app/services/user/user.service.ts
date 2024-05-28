import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../../DTO/mensajeDTO';
import { enviroments } from '../../../enviroments/enviroments';
import { PreguntaDTO } from '../../DTO/pregunta-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public getPreguntas(): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(enviroments.urlApi+'/user/obtener_preguntas.php'); 
  }

  public obtener_examenes_curso(id_curso:string): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(enviroments.urlApi+'/estudiante/obtener_examenes_curso.php?id_curso='+id_curso); 
  }

  public crearPregunta(pregunta:PreguntaDTO){
    return this.http.post<MensajeDTO>(enviroments.urlApi+'/profesor/crear_pregunta_opciones.php',pregunta);
  }
  
}
