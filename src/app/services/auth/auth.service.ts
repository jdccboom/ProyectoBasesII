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

  private loggedIn = false;

  constructor(private http:HttpClient) { this.loggedIn = !!localStorage.getItem('userData');
  }

  
  logout() {
    localStorage.removeItem('userData');
    this.loggedIn = false;
    window.location.reload();
  }

  setUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getUserData(): any {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public loginEstudiante(login:loginDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(enviroments.urlApi+'auth/loginEstudiante.php', login); 
  }

  public loginProfesor(login:loginDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(enviroments.urlApi+'auth/loginProfesor.php', login); 
  }
  
}
