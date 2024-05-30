import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../../DTO/mensajeDTO';
import { enviroments } from '../../../enviroments/enviroments';
import { PreguntaDTO } from '../../DTO/pregunta-dto';
import { quizDTO } from '../../DTO/quizDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public getPreguntas(): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(enviroments.urlApi+'/user/obtener_preguntas.php'); 
  }

  public getPreguntasProfesor(profesor_id:string): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(enviroments.urlApi+'/user/obtener_preguntas_profesor.php?profesor_id='+profesor_id); 
  }

  public obtener_examenes_curso(id_curso:string): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(enviroments.urlApi+'/estudiante/obtener_examenes_curso.php?id_curso='+id_curso); 
  }

  public crearPregunta(pregunta:PreguntaDTO){
    return this.http.post<MensajeDTO>(enviroments.urlApi+'/profesor/crear_pregunta_opciones.php',pregunta);
  }
  
  public crearExamen(quiz:quizDTO){
    return this.http.post<MensajeDTO>(enviroments.urlApi+'/profesor/crear_examen_proc.php',quiz);
  }

  public getExamenesPresentados(id_profesor:string){
    return this.http.get<MensajeDTO>(enviroments.urlApi+'/profesor/obtener_realizados_profesor.php?id_profesor='+id_profesor);
  }


   public getEstadisticasExamen(examen_id:number){
    return this.http.get<MensajeDTO>(enviroments.urlApi+'/profesor/obtener_estadisticas_examen.php?examen_id='+examen_id);
  }

  public getResultado(examen_id:number,estudiante_id:number){
    return this.http.get<MensajeDTO>(enviroments.urlApi+'/estudiante/obtener_datos_pregunta.php?examen_id='+examen_id+'&&estudiante_id='+estudiante_id);
  }

}
