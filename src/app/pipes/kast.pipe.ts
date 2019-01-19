import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kast'
})
export class KastPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
