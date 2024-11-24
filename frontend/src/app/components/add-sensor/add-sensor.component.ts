import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';  
// import {  PostData } from 'src/app/interfaces/devices'; 
import {  EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.scss'],
})
export class AddSensorComponent implements OnInit {

  name: string = '';
  selectedZone: string = '';

  constructor(private alertController: AlertController ) { }  

  ngOnInit() {}

  @Output() dataSubmitted: EventEmitter<{ name: string; selectedZone: string }> = new EventEmitter();

  onSubmit() {
    if (this.name && this.selectedZone) {
      this.dataSubmitted.emit({ name: this.name, selectedZone: this.selectedZone });
    }
    else{
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
