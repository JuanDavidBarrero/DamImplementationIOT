import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';  
import { DeviceService } from 'src/app/services/device.service';
import {  PostData } from 'src/app/interfaces/devices'; 


@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.scss'],
})
export class AddSensorComponent implements OnInit {

  name: string = '';
  selectedZone: string = '';

  constructor(private alertController: AlertController, private deviceService: DeviceService ) { }  

  ngOnInit() {}

  async onSubmit() {
    if (this.name && this.selectedZone) {
      console.log('Nombre:', this.name);
      console.log('Zona seleccionada:', this.selectedZone);

      const newDevice: PostData = {
        deviceName: this.name,
        location: this.selectedZone
      };

      try {
         await this.deviceService.createDevice(newDevice);
      } catch (error) {
        console.log("error in the http response");
        
      }


    } else {
      
      this.showAlert('Formulario inválido: Nombre o Zona vacíos');
    }
  }

  
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',  
      message: message,       
      buttons: ['OK'],        
      cssClass: 'custom-alert', 
    });

    await alert.present();
  }
}
