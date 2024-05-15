import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { loginDTO } from "../../DTO/loginDTO";
import { AuthService } from "../../services/auth/auth.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  invalidmail:string="form-control";
  invalidpass:string="form-control";
  Login:loginDTO;
  constructor(private loginService:AuthService, private routes:Router){
    this.Login = new loginDTO();
  }
  errorMessage:string='';
  token:string='';
  VerifyPass(event:any){
    this.invalidpass = "form-control ";
  }
  
  VerifyMail(event:any){
    this.invalidmail = "form-control ";
  }
  login(){
    if(this.Login.usuario == '' ){
      this.invalidmail=this.invalidmail+" is-invalid";
    }
    if(this.Login.contrasena == ''){
      this.invalidpass=this.invalidpass+" is-invalid";
    }
    if(this.Login.contrasena != '' && this.Login.usuario != '' ){
      //this.modal.open();
      this.loginService.loginEstudiante(this.Login).subscribe({
        next: (data:any) => {
          if(!data.error){
            console.log(data.respuesta);
            ///this.routes.navigate(['registrarProfesor']);
          }else
          {
            alert('El error es: '+data.respuesta);
          }
        }, 
        error: (err: any) => {
          alert('El error es: '+err.respuesta);
        }

      });  
    }
    
  }
}
