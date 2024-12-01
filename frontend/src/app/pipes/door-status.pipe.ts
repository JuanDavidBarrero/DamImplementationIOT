import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doorStatus'
})
export class DoorStatusPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Abierta' : 'Cerrada';
  }
}
