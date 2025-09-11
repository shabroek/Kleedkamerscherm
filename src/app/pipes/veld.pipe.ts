import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "veld",
})
export class VeldPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (typeof value === "string") {
      // Haal alleen het nummer of letter na 'veld' eruit
      const match = value.match(/veld\s*([\w\d]+)/i);
      if (match) {
        return match[1];
      }
      return value;
    }
    return value;
  }
}
