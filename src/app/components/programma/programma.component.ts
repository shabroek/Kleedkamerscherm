import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IWedstrijd } from "../../models/wedstrijd.model";

@Component({
  selector: "app-programma",
  templateUrl: "./programma.component.html",
  styleUrls: ["./programma.component.scss"],
})
export class ProgrammaComponent implements OnInit {
  @Input() programma$!: Observable<IWedstrijd[]>;
  @Input() numberOfDays: number = 0;
  @Input() sleutelMatch: boolean = false;
  @Input() isLoading: boolean = false;

  hasKleedkamerScheidsrechter$!: Observable<boolean>;
  bezigeWedstrijden$!: Observable<IWedstrijd[]>;
  toekomstigeWedstrijden$!: Observable<IWedstrijd[]>;

  ngOnInit(): void {
    if (this.programma$) {
      this.hasKleedkamerScheidsrechter$ = this.programma$.pipe(
        map((list) => list.some((w) => !!w.kleedkamerscheidsrechter))
      );
      
      this.bezigeWedstrijden$ = this.programma$.pipe(
        map((list) => list.filter((w) => w.isGestart))
      );
      
      this.toekomstigeWedstrijden$ = this.programma$.pipe(
        map((list) => list.filter((w) => !w.isGestart))
      );
    }
  }

  trackByWedstrijdId(index: number, wedstrijd: IWedstrijd): any {
    return wedstrijd.wedstrijdcode;
  }
}
