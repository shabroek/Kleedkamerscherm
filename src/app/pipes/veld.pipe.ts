import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "veld",
})
export class VeldPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (typeof value === "string") {
      let result = value
        .replace("veld ", "")
        .replace("veld 1", "-")
        .replace("veld 2", "-")
        .replace("veld 3", "-")
        .replace("veld 4", "-");

      // For fields 3 and 4, add "- Gras" suffix if not already present
      if (
        (result.includes("3") || result.includes("4")) &&
        !result.toLowerCase().includes("gras")
      ) {
        result = result + " - Gras";
      }

      return result;
    }
    return value;
  }
}
