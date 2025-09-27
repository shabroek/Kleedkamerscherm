import { Component, Input } from "@angular/core";
import { IWedstrijd } from "../../models/wedstrijd.model";
import { KleedkamerPipe } from "../../pipes/kleedkamer.pipe";
import { VeldTypePipe } from "../../pipes/veldtype.pipe";
import { VeldPipe } from "../../pipes/veld.pipe";

@Component({
  selector: "app-wedstrijd-row",
  templateUrl: "./wedstrijd-row.component.html",
  styleUrls: ["./wedstrijd-row.component.scss"],
  imports: [KleedkamerPipe, VeldTypePipe, VeldPipe],
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
