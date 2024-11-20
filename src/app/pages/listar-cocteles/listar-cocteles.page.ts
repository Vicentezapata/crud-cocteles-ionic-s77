import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton, IonCard, IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonList,IonItem,IonThumbnail,IonLabel, IonFab, IonFabButton,IonIcon,IonSearchbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router'; // Importa el módulo para la navegación entre rutas

//ICONOS
import { addIcons } from 'ionicons';
import { add,wineOutline } from 'ionicons/icons';

export interface Coctel{
  nombre:String,
  descripcion:String,
  ingredientes:String[],
  alcoholico:boolean,
  precio:number,
  imagenUrl:String
}

@Component({
  selector: 'app-listar-cocteles',
  templateUrl: './listar-cocteles.page.html',
  styleUrls: ['./listar-cocteles.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonThumbnail, IonButton, IonFab, IonFabButton,IonIcon,IonSearchbar]
})
export class ListarCoctelesPage implements OnInit {

  cocteles:Coctel[] = [
    { nombre: 'Tequila Margarita', descripcion: 'Un coctel refrescante con tequila y limón.', ingredientes: ['Tequila', 'Limón', 'Sal'], alcoholico: true, precio: 1200,imagenUrl:"https://www.gourmet.cl/wp-content/uploads/2011/10/Margarita-e1319802606185.jpg" },
    { nombre: 'Pisco Sour', descripcion: 'Una bebida ácida y espumosa a base de pisco.', ingredientes: ['Pisco', 'Limón', 'Azúcar', 'Clara de huevo'], alcoholico: true, precio: 1500,imagenUrl:"https://cdn.recetasderechupete.com/wp-content/uploads/2020/03/Pisco-Sour.jpg" },
    { nombre: 'Ron Cola', descripcion: 'El clásico ron con cola.', ingredientes: ['Ron', 'Cola'], alcoholico: true, precio: 1000,imagenUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3hVtD2V_9qP0rAkbPVON74d9XSxZmndtOlw&s" },
    { nombre: 'Mojito', descripcion: 'Coctel cubano refrescante con menta.', ingredientes: ['Ron', 'Menta', 'Azúcar', 'Agua con gas'], alcoholico: true, precio: 1300,imagenUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToLtZ29jmwuq6JkU54lYtAvbfja-2YZ9E0RQ&s" }
  ]

  constructor(private router: Router) {
    addIcons({ add,wineOutline })
  }

  ngOnInit() {
  }

  goToCreate(){
    this.router.navigate(['/agregar-cocteles']);
  }
  goToRandom(){
    this.router.navigate(['/random']);
  }

  eliminarCoctel(index:number){
    this.cocteles.splice(index,1)
  }

}
