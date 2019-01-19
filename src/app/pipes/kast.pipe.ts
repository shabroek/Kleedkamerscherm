import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kast'
})
export class KastPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof (value) === 'string') {
      value = value.replace('-', '');
      if (value.length > 0) {
        const kast = value.substring(value.length - 1);
        const number = +kast;
        if (number === NaN) {
          return kast;
        }
        return '';
      }
    }
  }
}
