import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ModalService } from '../../services/extService/modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [LoginComponent, RouterModule]
})
export class HomeComponent {

  constructor(private authService: AuthService, private routes: Router, private modal: ModalService) {

  }
  loggedIn: boolean = this.authService.isLoggedIn();
  userId: string = "";
  hiddenMenu = false;
  modalCerrar= false;

  logout() {
    this.modal.openDialog("Cerrar", "Desea cerrar sesión", this.modalCerrar);
    console.log(this.modalCerrar)
  }

  mostrarMenu() {
    this.hiddenMenu = this.hiddenMenu;
  }
}

