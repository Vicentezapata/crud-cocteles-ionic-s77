import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonFab,IonFabButton,IonIcon,IonImg } from '@ionic/angular/standalone';


//ICONOS
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import {Motion} from '@capacitor/motion'
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-random',
  templateUrl: './random.page.html',
  styleUrls: ['./random.page.scss'],
  standalone: true,
  imports: [HttpClientModule,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonFab,IonFabButton,IonIcon,IonImg]
})
export class RandomPage implements OnInit {
  cocktail: any
  constructor(private http:HttpClient,private router:Router) { 
    addIcons({ arrowBackOutline });
  }

  ngOnInit() {
    this.startShakeDetection()
  }

  async startShakeDetection(){
    await Motion.addListener('accel',async(event)=>{
      console.log("TEST MOTION")
      const nivel = 10
      if(
        Math.abs(event.acceleration.x) > nivel &&
        Math.abs(event.acceleration.y) > nivel &&
        Math.abs(event.acceleration.z) > nivel 
      ){
        this.getRandomCocktail()
      }


    })
  }
  async getRandomCocktail(){
    try{
      const response = await this.http.get('https://www.thecocktaildb.com/api/json/v1/1/random.php').toPromise();
      if(response && (response as any).drinks && (response as any).drinks.length > 0){
        this.cocktail = (response as any).drinks[0]
        console.log(response)
      }else{
        console.log("Invalid API response")
      }
    }catch(error){
      console.error("error al obtener comunicacion con la api")
    }


    
  }

  goToListar(){
    this.router.navigate(['/listar-cocteles']);
  }
}
