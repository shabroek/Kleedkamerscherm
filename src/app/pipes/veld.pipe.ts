import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'veld'
})
export class VeldPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof (value) === 'string') {
      return value.replace('Veld ', '')
      .replace('veld 1', 'onbekend')
      .replace('veld 2', 'onbekend')
      .replace('veld 3', 'onbekend')
      .replace('veld 4', 'onbekend');
    }
    return value;
  }

}
