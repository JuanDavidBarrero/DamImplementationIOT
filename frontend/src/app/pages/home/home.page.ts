import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DeviceService } from 'src/app/services/device.service';
import { Device } from 'src/app/interfaces/devices'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  devices: Device[] = []; 

  constructor(
    private navController: NavController,
    private deviceService: DeviceService
  ) {}

  ngOnInit() {
    this.loadDevices();
  }

  async loadDevices() {
    try {
      const response = await this.deviceService.getDevices();
      this.devices = response; 
    } catch (error) {
      console.error('Error al cargar los dispositivos:', error);
    }
  }

  onDeviceCardClick(id: string) {
    this.navController.navigateForward(`/devices/${id}`);
  }
}
