import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  constructor(private dialog:MatDialogRef<DialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,private auth: AuthService, private routes:Router){}

  ngOnInit(): void {
  }
  
  close(){
    console.log(this.data.resultado)
    this.data.resultado=true;
    this.dialog.close();
  }
  accept(){
    console.log(this.data.resultado)
    this.auth.logout();
    this.routes.navigate(["/home"]);
    this.dialog.close();
  }
}
