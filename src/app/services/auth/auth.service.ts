import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { loginDTO } from "../../DTO/loginDTO";
import { MensajeDTO } from "../../DTO/mensajeDTO";
import { Observable } from "rxjs";
import { enviroments } from "../../../enviroments/enviroments";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }

  public loginEstudiante(login:loginDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(enviroments.urlApi+'/auth/loginEstudiante.php', login); 
  }

  public loginProfesor(login:loginDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(enviroments.urlApi+'/auth/loginProfesor.php', login); 
  }
}
