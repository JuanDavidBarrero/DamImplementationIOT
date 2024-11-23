import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device, DeviceResponse, PostData } from '../interfaces/devices';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private apiUrl = 'http://localhost:3000/api/devices'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  async getDevices(): Promise<Device[]> {
    try {
      const response = await firstValueFrom(this.http.get<Device[]>(this.apiUrl));
      return response || []; 
    } catch (error) {
      console.error('Error al obtener los dispositivos:', error);
      return []; 
    }
  }

  async createDevice(newDevice: PostData): Promise<DeviceResponse | null> {
    try {
      const response = await firstValueFrom(this.http.post<DeviceResponse>(this.apiUrl, newDevice));
      return response; 
    } catch (error) {
      console.error('Error al crear el dispositivo:', error);
      return null; 
    }
  }
}
