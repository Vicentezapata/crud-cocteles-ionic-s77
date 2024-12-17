import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton, IonCard, IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonList,IonItem,IonThumbnail,IonLabel, IonFab, IonFabButton,IonIcon,IonSearchbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router'; // Importa el módulo para la navegación entre rutas
import { StorageService } from '../../services/storage.service';

//ICONOS
import { addIcons } from 'ionicons';
import { add,wineOutline } from 'ionicons/icons';
import { HttpClient,HttpClientModule } from '@angular/common/http';

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
  imports: [HttpClientModule,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonThumbnail, IonButton, IonFab, IonFabButton,IonIcon,IonSearchbar]
})
export class ListarCoctelesPage implements OnInit {

  searchTerm:String=''

  cocteles:Coctel[] = []

  constructor(private router: Router,private http:HttpClient,private storageService: StorageService) {
    addIcons({ add,wineOutline })
  }

  ngOnInit() {
    this.obtenerDataApi()
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

  onSearch(){
    console.log("Buscando: " + this.searchTerm);
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.searchTerm.trim()}`
    this.http.get<{drinks:any[]}>(url).subscribe({
      next:(response)=>{
        if (response.drinks) {
          console.log(response)
          console.log(url)
          this.cocteles = response.drinks.map((drink) => ({
            nombre: drink.strDrink,
            descripcion: `Un delicioso cóctel con ${this.searchTerm.trim()}.`,
            ingredientes: [this.searchTerm.trim()],
            alcoholico: true,
            precio: 1500,
            imagenUrl: drink.strDrinkThumb
          }));
        }else{
          this.cocteles = []
        }

      },
      error:(err)=>{
        console.error('Error al obtener los cocteles:',err)

      }

    })
  }
  async obtenerDataApi(){
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    const allCocktails : Coctel[] = []
    for(const letter of alphabet){
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
      const response = await this.http.get<{ drinks: any[] }>(url).toPromise();
      console.log('Response:', url);
      console.log('Response:', response);
      if (response?.drinks) {
        const cocktails = response.drinks.map((drink) => ({
          nombre: drink.strDrink,
          descripcion: `Un delicioso cóctel con ${drink.strIngredient1}.`,
          ingredientes: [drink.strIngredient1],
          alcoholico: drink.strAlcoholic === 'Alcoholic',
          precio: 1500,
          imagenUrl: drink.strDrinkThumb
        }));
        allCocktails.push(...cocktails);
      }
      await this.delay(100);
    }
    await this.storageService.set('cocteles', allCocktails);
    this.cocteles = allCocktails;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
