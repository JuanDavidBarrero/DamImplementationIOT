import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataPageRoutingModule } from './data-routing.module';
import { DataPage } from './data.page';

// Importa el servicio DeviceService
import { DeviceService } from 'src/app/services/device.service';  // Asegúrate de que la ruta sea correcta

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataPageRoutingModule
  ],
  declarations: [DataPage],
  providers: [DeviceService]  // Proporciona el servicio aquí
})
export class DataPageModule {}
