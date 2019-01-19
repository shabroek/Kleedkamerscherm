import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'veld'
})
export class VeldPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof (value) === 'string') {
      return value.replace('Veld ', '')
      .replace('veld 1', '-')
      .replace('veld 2', '-')
      .replace('veld 3', '-')
      .replace('veld 4', '-');
    }
    return value;
  }

}
