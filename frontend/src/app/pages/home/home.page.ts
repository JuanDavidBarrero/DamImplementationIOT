import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';  // Importamos NavController

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  onDeviceCardClick(id: string) {
    console.log('ID del dispositivo:', id);  // Aquí deberías ver el ID en la consola
    this.navController.navigateForward(`/devices/${id}`);
  }
  
}
