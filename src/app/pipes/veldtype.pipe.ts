import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'veldType',
})
export class VeldTypePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const lower = value.toLowerCase();
    if (lower.includes('kunst')) return 'Kunstgras';
    if (lower.includes('gras')) return 'Natuurgras';
    return '';
  }
}
