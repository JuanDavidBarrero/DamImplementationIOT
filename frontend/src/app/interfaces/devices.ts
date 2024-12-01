export interface Device {
    device_id: string;       
    name: string;      
    location: string;   
  }

  export interface DeviceResponse {
    message: string;    
    device: response;     
  }
  
  export interface response {
    deviceId: number;    
    deviceName: string;  
    location: string;    
    valveId: number;     
  }
  

  export interface PostData {
    deviceName: string;
    location: string;
  }
  
  export interface MeasurementResponse {
    message: string;
    measurementId: number;
    deviceId: string;
    data: number;
  }
  