import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import {IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonInput, IonButton, IonToggle, IonInputPasswordToggle, IonRow, IonCol, IonText} from '@ionic/angular/standalone'; // Importa componentes de Ionic para el diseño de la interfaz
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonCard, IonCardHeader, IonCardTitle, 
    IonCardSubtitle, IonCardContent, IonInput, IonButton, IonToggle, IonInputPasswordToggle, 
    IonRow, IonCol, IonText]
})
export class LoginPage implements OnInit {
  form!:FormGroup

  constructor(private router: Router,private storage:StorageService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),

      password:new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
    })
  }


  goToRegister(){
    this.router.navigate(['/register'])
  }
  
  async validar(){
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return
    }
    const {email,password} = this.form.value
    console.log("Email",email)
    console.log("password",password)
    const isValid = await this.storage.loginUser(email,password)
    if(isValid){
      this.router.navigate(['/listar-cocteles'])
    }else{
      console.log("Usuario o contraseña incorrecta")
    }

  }
}
