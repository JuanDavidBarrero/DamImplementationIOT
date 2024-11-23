import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';  // Asegúrate de importar NavController

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
})
export class DeviceCardComponent {
  @Input() id: string = ''; // Añadimos un Input para el ID
  @Input() icon: string = 'thermometer-outline'; 
  @Input() text: string = 'Dispositivo'; 
  @Input() currentValue: string = '25°C'; 
  @Input() previousValue: string = '22°C'; 
  @Input() location: string = 'Zona Uno'; 

  @Output() cardClicked = new EventEmitter<string>();  // Usamos un EventEmitter

  // Método que se ejecuta al hacer clic
  onCardClick() {
    this.cardClicked.emit(this.id);
  }
}
