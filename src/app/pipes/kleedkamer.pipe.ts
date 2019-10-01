import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kleedkamer'
})
export class KleedkamerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof (value) === 'string') {
      const kleedkamer: string = value.replace('Kleedkamer ', '');
      return kleedkamer;
    }
    return value;
  }
}
