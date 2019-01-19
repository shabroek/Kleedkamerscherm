import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jongbrabant'
})
export class JongbrabantPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof (value) === 'string') {
      if (value.indexOf('JO') > 0) {
        return value.replace('Jong Brabant ', '').replace('Jong-Brabant ', '');
      } else {
        return value.replace('Jong Brabant', 'JB').replace('Jong-Brabant', 'JB');
      }
    }
    return value;
  }

}
