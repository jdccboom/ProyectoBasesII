import { Injectable } from '@angular/core';
import { MensajeDTO } from '../../DTO/mensajeDTO';
import { enviroments } from '../../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObtenerExamenesCursoService {

  constructor(private http:HttpClient) { }

  public loginEstudiante(id_curso:string): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(enviroments.urlApi+'/estudiante/obtener_examenes_curso.php?id_curso='+id_curso); 
  }
}
