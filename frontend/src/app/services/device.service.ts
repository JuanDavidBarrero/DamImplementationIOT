import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Device, DeviceResponse, PostData } from '../interfaces/devices';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private apiUrl = 'http://localhost:3000/api/devices';
  // private apiUrl = 'http://backend_container:3000/api/devices';


  constructor(private http: HttpClient) {}

 
  async getDeviceData(id: number, unique: boolean = false): Promise<any> {
    try {
      let params = new HttpParams();
      if (unique) {
        params = params.set('unique', '1');  
      }
      const response = await firstValueFrom(this.http.get<any>(`${this.apiUrl}/${id}`, { params }));
      return response || [];
    } catch (error) {
      console.error('Error al obtener los datos del dispositivo:', error);
      return [];
    }
  }

  async changeDeviceState(id: string, state: string): Promise<any> {
    try {
      const body = { state };  // Enviar el estado en el cuerpo de la solicitud
      const response = await firstValueFrom(this.http.post<any>(`${this.apiUrl}/${id}`, body));
      return response;
    } catch (error) {
      console.error('Error al cambiar el estado del dispositivo:', error);
      return null;
    }
  }

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
