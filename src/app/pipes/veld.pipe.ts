import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "veld",
})
export class VeldPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (typeof value === "string") {
      // Haal alles na 'veld' eruit (inclusief spaties en meerdere delen)
      const match = value.match(/veld\s*([\w\d ]+)/i);
      if (match) {
        return match[1].trim();
      }
      return value;
    }
    return value;
  }
}
