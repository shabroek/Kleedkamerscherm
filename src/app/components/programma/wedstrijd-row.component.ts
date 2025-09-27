import { Component, Input } from "@angular/core";
import { IWedstrijd } from "../../models/wedstrijd.model";

@Component({
  selector: "app-wedstrijd-row",
  templateUrl: "./wedstrijd-row.component.html",
  styleUrls: ["./wedstrijd-row.component.scss"],
})
export class WedstrijdRowComponent {
  @Input() wedstrijd!: IWedstrijd;
  @Input() sleutelMatch: boolean = false;
  @Input() numberOfDays: number = 0;

  @Input() index!: number;

  hasKast(waarde: string | null | undefined): boolean {
    return !!waarde && /[a-zA-Z]/.test(waarde);
  }
}
