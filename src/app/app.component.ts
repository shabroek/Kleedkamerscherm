import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
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
  now: Date = new Date();
  progress = 0;
  progressInterval: any;
  refreshInterval = 60000;
  programma$ = new BehaviorSubject<IWedstrijd[]>([]);
  kleedkamer: KleedkamerPipe;
  veld: VeldPipe;
  sleutelMatch: boolean;
  hasUitslagen: boolean;
  hasProgramma: boolean;
  uitslagen$: Observable<IUitslag[]>;
  numberOfDays = 0;
  programmaError = false;
  uitslagenError = false;

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
    this.startProgressBar();
  }

  private laadData(days: number) {
    this.programmaService.getProgramma(days).subscribe({
      next: (newData: IWedstrijd[]) => {
        this.programmaError = false;
        if (newData && newData.length > 0) {
          this.hasProgramma = true;
          this.programma$.next(newData);
          this.sleutelMatch = newData.some((x) => x.kast);
        } else {
          // Geen nieuwe data, oude data blijft staan
          this.hasProgramma = false;
          // Alleen uitslagen ophalen als er geen programma is
          this.programmaService.getUitslagen(7).subscribe({
            next: (newData: IUitslag[]) => {
              this.uitslagenError = false;
              if (newData && newData.length > 0) {
                // Filter op uitslagen van vandaag
                const vandaag = new Date();
                const vandaagStr = vandaag.toISOString().slice(0, 10);
                const uitslagenVandaag = newData.filter((u) => {
                  // Gebruik altijd het veld 'wedstrijddatum' (ISO-string)
                  if (!u.wedstrijddatum) return false;
                  const d =
                    typeof u.wedstrijddatum === "string"
                      ? (u.wedstrijddatum as string).slice(0, 10)
                      : new Date(u.wedstrijddatum as unknown as string)
                          .toISOString()
                          .slice(0, 10);
                  return d === vandaagStr;
                });
                this.hasUitslagen = uitslagenVandaag.length > 0;
                if (this.uitslagen$) {
                  this.uitslagen$ = this.uitslagen$.pipe(
                    map(() => uitslagenVandaag)
                  );
                } else {
                  this.uitslagen$ = of(uitslagenVandaag);
                }
              } else {
                // Geen nieuwe data, oude data blijft staan
                this.hasUitslagen = false;
              }
            },
            error: () => {
              this.uitslagenError = true;
            },
          });
        }
      },
      error: () => {
        this.programmaError = true;
      },
    });
  }

  startProgressBar() {
    this.progress = 0;
    const step = 100 / (this.refreshInterval / 100);
    this.progressInterval = setInterval(() => {
      this.progress += step;
      if (this.progress >= 100) {
        this.progress = 0;
        this.laadData(this.numberOfDays);
      }
    }, 100);
  }
}
