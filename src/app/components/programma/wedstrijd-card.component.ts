import { Component, Input } from "@angular/core";
import { IWedstrijd } from "../../models/wedstrijd.model";

@Component({
  selector: "app-wedstrijd-card",
  templateUrl: "./wedstrijd-card.component.html",
  styleUrls: ["./wedstrijd-card.component.scss"],
})
export class WedstrijdCardComponent {
  @Input() wedstrijd!: IWedstrijd;
  @Input() sleutelMatch: boolean = false;
  @Input() numberOfDays: number = 0;

  hasKast(waarde: string | null | undefined): boolean {
    return !!waarde && /[a-zA-Z]/.test(waarde);
  }
}
