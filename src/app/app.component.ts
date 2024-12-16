import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { IUitslag } from "./models/uitslag.model";
import { IWedstrijd } from "./models/wedstrijd.model";
import { KleedkamerPipe } from "./pipes/kleedkamer.pipe";
import { VeldPipe } from "./pipes/veld.pipe";
import { ProgrammaService } from "./services/programma.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  programma$: Observable<IWedstrijd[]>;
  kleedkamer: KleedkamerPipe;
  veld: VeldPipe;
  sleutelMatch: boolean;
  hasUitslagen: boolean;
  hasProgramma: boolean;
  uitslagen$: Observable<IUitslag[]>;
  numberOfDays = 0;

  constructor(
    private programmaService: ProgrammaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        filter((params) => params.days),
        map((params) => params.days),
        tap((numberOfDays: number) => (this.numberOfDays = numberOfDays)),
        tap((numberOfDays: number) => this.laadData(numberOfDays))
      )
      .subscribe();

    this.hasProgramma = true;
    this.hasUitslagen = true;
    this.laadData(0);
    this.startTimer();
  }

  private laadData(days: number) {
    this.programmaService
      .getProgramma(days)
      .pipe(
        tap((newData: IWedstrijd[]) => {
          this.hasProgramma = newData.length > 0;
          if (this.programma$) {
            this.programma$ = this.programma$.pipe(
              map((existingData) => {
                const updatedData = existingData.map((item) => {
                  const newItem = newData.find(
                    (newItem) => newItem.wedstrijdcode === item.wedstrijdcode
                  );
                  return newItem ? newItem : item;
                });
                const newItems = newData.filter(
                  (newItem) =>
                    !existingData.some(
                      (item) => item.wedstrijdcode === newItem.wedstrijdcode
                    )
                );
                return [...updatedData, ...newItems];
              })
            );
          } else {
            this.programma$ = of(newData);
          }
          this.sleutelMatch = newData.some((x) => x.kast);
        })
      )
      .subscribe();

    this.programmaService
      .getUitslagen(days)
      .pipe(
        tap((newData: IUitslag[]) => {
          this.hasUitslagen = newData.length > 0;
          if (this.uitslagen$) {
            this.uitslagen$ = this.uitslagen$.pipe(
              map((existingData) => {
                const updatedData = existingData.map((item) => {
                  const newItem = newData.find(
                    (newItem) => newItem.wedstrijdcode === item.wedstrijdcode
                  );
                  return newItem ? newItem : item;
                });
                const newItems = newData.filter(
                  (newItem) =>
                    !existingData.some(
                      (item) => item.wedstrijdcode === newItem.wedstrijdcode
                    )
                );
                return [...updatedData, ...newItems];
              })
            );
          } else {
            this.uitslagen$ = of(newData);
          }
        })
      )
      .subscribe();
  }

  startTimer() {
    setInterval(() => this.laadData(this.numberOfDays), 60000);
  }
}
