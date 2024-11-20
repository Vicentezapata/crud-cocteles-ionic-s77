import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class TakePhotoService {
    photo: string | null = null; // Almacena la URI de la foto
    location: { latitude: number; longitude: number } | null = null; // Almacena la ubicación
    address: string | null = null; // Almacena la dirección

    constructor(private platform: Platform) { } // Inyectar Platform en el constructor

    async takePhoto() {
        try {
            // Seleccionar fuente según la plataforma
            const cameraSource = this.platform.is('android') ? CameraSource.Photos : CameraSource.Camera;

            //Tomar la foto
            const image = await Camera.getPhoto({
                quality: 90,
                resultType: CameraResultType.Uri, // Usar Uri para obtener la URI de la imagen
                source: cameraSource,
            })
            this.photo = image.webPath || null;

            const coordinates = await Geolocation.getCurrentPosition();
            this.location = {
                latitude: coordinates.coords.latitude,
                longitude: coordinates.coords.longitude
            }

            //Obtener direccion a partir de la ubicacion
            this.address = await this.getAddressFromCoordinates(this.location.latitude,this.location.longitude)

            return {
                photo: this.photo,
                location: this.location,
                address: this.address,
            }


        } catch (error) {
            console.error('Error al tomar foto o ubicación', error);
            return null;
        }
    }

    //Metodo para obtener la direccion
    async getAddressFromCoordinates(latitude: number, longitude: number): Promise<string | null> {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.display_name || 'Dirección no disponible';
        } catch (error) {
            console.error('Error al obtener la dirección:', error);
            return null;
        }
    }


}