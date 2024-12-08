import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { DeviceCardComponent } from 'src/app/components/device-card/device-card.component';
import {  AddSensorComponent } from 'src/app/components/add-sensor/add-sensor.component';
import { DeviceService } from 'src/app/services/device.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage,DeviceCardComponent,AddSensorComponent],
  providers: [DeviceService]  
})
export class HomePageModule {}
