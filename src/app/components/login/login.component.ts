import { HttpClientModule } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { loginDTO } from "../../DTO/loginDTO";
import { AuthService } from "../../services/auth/auth.service";
import { AlertaComponent } from "../alerta/alerta.component";
import { Alerta } from "../../DTO/Alerta";


@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule, RouterModule, HttpClientModule, AlertaComponent]
})

export class LoginComponent {
  invalidmail:string="form-control";
  invalidpass:string="form-control";
  @Input() home:any;
  Login:loginDTO;
  alerta!: Alerta|null;
  constructor(private loginService:AuthService, private routes:Router,private authService:AuthService){
    this.Login = new loginDTO();
  }
  errorMessage:string='';
  login(){
    if(this.Login.email == '' ){
      this.invalidmail=this.invalidmail+" is-invalid";
    }
    if(this.Login.contrasenia == ''){
      this.invalidpass=this.invalidpass+" is-invalid";
    }
    if(this.Login.contrasenia != '' && this.Login.email != '' ){
      //this.modal.open();
      this.loginService.loginEstudiante(this.Login).subscribe({
        next: (data:any) => {
            this.authService.setUserData(data.respuesta,"ESTUDIANTE");
            this.alerta= new Alerta(data.respuesta,'success');

            this.home.loggedIn=true;
            this.routes.navigate(['/home/preguntas']);
        }, 
        error: (err: any) => {
          this.loginService.loginProfesor(this.Login).subscribe({
            next: (data:any) => {
                this.authService.setUserData(data.respuesta,"PROFESOR");
                this.alerta= new Alerta(data.respuesta,'success');
                this.home.loggedIn=true;
                this.routes.navigate(['/home/preguntas']);
            }, 
            error: (err: any) => {
                this.alerta= new Alerta(err.error.respuesta,'danger');
            }});
        }
      });  
    }
    
  }
}
