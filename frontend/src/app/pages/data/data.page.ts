import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {

  id: string | null = null;
  deviceData: any[] = [];  

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      if (this.id) {
        this.deviceService.getDeviceData(Number(this.id), false).then(response => {
          this.deviceData = response;  
        }).catch(error => {
          console.error('Error al obtener los datos del dispositivo:', error);
        });
      }
    });
  }

  // Función para mostrar el estado de la puerta basado en el valor de logs
  getDoorStatus(logs: boolean): string {
    return logs ? 'Abierta' : 'Cerrada';
  }

  navigateToDevice() {
    if (this.id) {
      this.router.navigate(['/devices', this.id]);  // Navega a la ruta devices/{id}
    }
  }
  
}
