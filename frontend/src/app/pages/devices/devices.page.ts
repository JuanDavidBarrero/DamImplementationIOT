import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  

import { DeviceService } from 'src/app/services/device.service';


@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {

  id: string | null = null;  
  deviceName: string = '';  
  date: Date = new Date();  
  readingValue: number = 0;  
  location: string = '';  
  isOn: boolean = false;  

  constructor(
    private route: ActivatedRoute, 
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');  
      console.log('ID recibido: ', this.id);

      if (this.id) {
        // Llama al servicio para obtener los datos del dispositivo
        this.deviceService.getDeviceData(Number(this.id), true).then(response => {
          if (response && response.length > 0) {
            // Asigna los datos recibidos a las propiedades
            const deviceData = response[0];
            this.deviceName = deviceData.name;
            this.date = new Date(deviceData.date);  // Asegúrate de convertir la fecha correctamente
            this.readingValue = parseFloat(deviceData.data);  // Asegúrate de que `data` sea un número
            this.location = deviceData.location;
          }
        }).catch(error => {
          console.error('Error al obtener los datos del dispositivo:', error);
        });
      }
    });
  }

  showData() {
    console.log('Mostrar datos del dispositivo', {
      deviceName: this.deviceName,
      date: this.date,
      readingValue: this.readingValue,
      location: this.location
    });
  }
}
