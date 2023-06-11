import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "pipe",
})
export class MyPipe implements PipeTransform {
  transform(value: string): string {
    if (value === "Male") {
      return "Homme";
    } else if (value === "Female") {
      return "Femme";
    }
    return value;
  }
}
