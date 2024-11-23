import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';  // Reemplaza ToastController por AlertController

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.scss'],
})
export class AddSensorComponent implements OnInit {

  name: string = '';
  selectedZone: string = '';

  constructor(private alertController: AlertController) { }  // Usa AlertController

  ngOnInit() {}

  async onSubmit() {
    if (this.name && this.selectedZone) {
      console.log('Nombre:', this.name);
      console.log('Zona seleccionada:', this.selectedZone);
    } else {
      // Mostrar mensaje de error
      this.showAlert('Formulario inválido: Nombre o Zona vacíos');
    }
  }

  // Método para mostrar el alert
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',  // Título del alert
      message: message,       // El mensaje que pasas a la función
      buttons: ['OK'],        // Botón para cerrar el alert
      cssClass: 'custom-alert', // Clase personalizada para estilo (opcional)
    });

    await alert.present();
  }
}
