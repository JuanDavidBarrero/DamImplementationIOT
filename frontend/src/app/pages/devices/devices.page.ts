import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { DeviceService } from 'src/app/services/device.service';
import { ToastController } from '@ionic/angular';  

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
    private deviceService: DeviceService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');  

      if (this.id) {
        
        this.deviceService.getDeviceData(Number(this.id), true).then(response => {
          if (response && response.length > 0) {
            
            const deviceData = response[0];
            this.deviceName = deviceData.name;
            this.date = new Date(deviceData.date);  
            this.readingValue = parseFloat(deviceData.data);  
            this.location = deviceData.location;
            this.isOn = deviceData.logs;  
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

  async onToggleChange() {
    const state = this.isOn ? 'open' : 'close';
    console.log('Cambiando estado del dispositivo:', state);

    if (this.id) {
      try {
        const response = await this.deviceService.changeDeviceState(this.id, state);
        if (response) {

          
          const toast = await this.toastController.create({
            message: state === 'open' ? 'Válvula abierta exitosamente' : 'Válvula cerrada exitosamente',
            duration: 500,
            icon: 'checkmark-circle',  
            color: 'success',  
            position: 'bottom'  
          });
          await toast.present();  
        } else {
          console.error('Error al cambiar el estado del dispositivo');
        }
      } catch (error) {
        console.error('Error al cambiar el estado:', error);
      }
    }
  }
}
