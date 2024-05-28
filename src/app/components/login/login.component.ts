import { HttpClientModule } from "@angular/common/http";
import { Component, Input } from "@angular/core";
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
  @Input() home:any;
  Login:loginDTO;
  constructor(private loginService:AuthService, private routes:Router,private authService:AuthService){
    this.Login = new loginDTO();
  }
  errorMessage:string='';
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
            this.authService.setUserData(data.respuesta);
            console.log(data.respuesta);
            console.log(this.home);
            this.home.loggedIn=true;
            this.routes.navigate(['/home/preguntas']);
        }, 
        error: (err: any) => {
          alert('El error es: '+err.respuesta);
        }

      });  
    }
    
  }
}
