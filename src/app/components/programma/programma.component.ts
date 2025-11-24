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
        map((list) => {
          const now = Date.now();
          const TWO_HOURS = 2 * 60 * 60 * 1000;
          return list
            .filter((w) => {
              if (!w.isGestart) return false;
              if (w.afgelast) {
                // Alleen tonen als de begintijd minder dan 2 uur geleden is
                const start = new Date(w.wedstrijddatum).getTime();
                if (now - start > TWO_HOURS) {
                  return false;
                }
              }
              return true;
            })
            .sort((a, b) => {
              // Eerst aflopend op tijd (laatst gestarte eerst)
              const timeComparison =
                new Date(b.wedstrijddatum).getTime() -
                new Date(a.wedstrijddatum).getTime();
              if (timeComparison !== 0) return timeComparison;

              // Dan op veld
              return a.veld.localeCompare(b.veld);
            });
        })
      );

      this.toekomstigeWedstrijden$ = this.programma$.pipe(
        map((list) =>
          list
            .filter((w) => !w.isGestart)
            .sort((a, b) => {
              // Eerst oplopend op tijd
              const timeComparison =
                new Date(a.wedstrijddatum).getTime() -
                new Date(b.wedstrijddatum).getTime();
              if (timeComparison !== 0) return timeComparison;

              // Dan op veld
              return a.veld.localeCompare(b.veld);
            })
        )
      );
    }
  }

  trackByWedstrijdId(index: number, wedstrijd: IWedstrijd): any {
    return wedstrijd.wedstrijdcode;
  }
}
