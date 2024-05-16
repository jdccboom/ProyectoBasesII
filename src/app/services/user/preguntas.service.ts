import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MensajeDTO } from "../../DTO/mensajeDTO";
import { Observable } from "rxjs";
import { enviroments } from "../../../enviroments/enviroments";



@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  constructor(private http:HttpClient) { }

  public getPreguntas(codigoExamen:string): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(enviroments.urlApi+'/auth/getPreguntas.php/codigoExamen='+codigoExamen); 
  }

}
