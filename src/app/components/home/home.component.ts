import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [LoginComponent,RouterModule]
})
export class HomeComponent {

  constructor(private authService:AuthService,private routes:Router){

  }
  loggedIn:boolean=this.authService.isLoggedIn();
  userId:string="";
  hiddenMenu=false;

  logout() {
    alert("Sesión cerrada");
    
    this.authService.logout()
    // Aquí puedes agregar cualquier lógica necesaria para cerrar sesión
    
    this.routes.navigate(["/home"]);
  }
  
  mostrarMenu(){
    this.hiddenMenu=this.hiddenMenu;
  }
}

