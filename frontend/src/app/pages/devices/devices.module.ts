import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevicesPageRoutingModule } from './devices-routing.module';

import { DevicesPage } from './devices.page';
import { DeviceService } from 'src/app/services/device.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevicesPageRoutingModule,
  ],
  declarations: [DevicesPage],
  providers: [DeviceService]  
})
export class DevicesPageModule {}
