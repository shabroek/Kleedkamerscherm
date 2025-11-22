import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, merge, Observable, of, Subject } from "rxjs";
import { map, switchMap } from "rxjs/operators";
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
  isLoadingProgramma = false;
  isLoadingUitslagen = false;
  private refresh$ = new Subject<void>();
  private isInitialLoad = true;

  constructor(
    private programmaService: ProgrammaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.hasProgramma = false;
    this.hasUitslagen = false;

    // Start progress bar
    this.startProgressBar();

    // STANDAARD Angular pattern: merge route params met refresh triggers
    merge(
      this.route.queryParams.pipe(
        map((params) => (params.days ? parseInt(params.days, 10) : 0))
      ),
      this.refresh$.pipe(map(() => this.numberOfDays))
    )
      .pipe(
        switchMap((numberOfDays) => {
          this.numberOfDays = numberOfDays;
          // Alleen loading indicator bij eerste load
          if (this.isInitialLoad) {
            this.isLoadingProgramma = true;
          }
          return this.programmaService.getProgramma(numberOfDays);
        })
      )
      .subscribe({
        next: (newData: IWedstrijd[]) => {
          this.isLoadingProgramma = false;
          this.isInitialLoad = false;
          this.programmaError = false;
          if (newData && newData.length > 0) {
            this.hasProgramma = true;
            // Update alleen de veranderde velden, behoud array referentie waar mogelijk
            this.updateProgrammaData(newData);
            this.sleutelMatch = newData.some((x) => x.kast);
          } else {
            this.hasProgramma = false;
            // Uitslagen ophalen als er geen programma is
            this.loadUitslagenData();
          }
        },
        error: (error) => {
          this.isLoadingProgramma = false;
          this.programmaError = true;
          console.error("Error loading programma:", error);
        },
      });
  }

  private loadUitslagenData() {
    this.isLoadingUitslagen = true;
    this.programmaService.getUitslagen(7).subscribe({
      next: (newData: IUitslag[]) => {
        this.isLoadingUitslagen = false;
        this.uitslagenError = false;
        if (newData && newData.length > 0) {
          // Filter op uitslagen van vandaag
          const vandaag = new Date();
          const vandaagStr = vandaag.toISOString().slice(0, 10);
          const uitslagenVandaag = newData.filter((u) => {
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
            this.uitslagen$ = this.uitslagen$.pipe(map(() => uitslagenVandaag));
          } else {
            this.uitslagen$ = of(uitslagenVandaag);
          }
        } else {
          this.hasUitslagen = false;
        }
      },
      error: (error) => {
        this.isLoadingUitslagen = false;
        this.uitslagenError = true;
        this.hasUitslagen = false;
        console.error("Error loading uitslagen:", error);
      },
    });
  }

  private laadData(days: number) {
    console.log("laadData called with days:", days);
    this.isLoadingProgramma = true;
    this.programmaService.getProgramma(days).subscribe({
      next: (newData: IWedstrijd[]) => {
        this.isLoadingProgramma = false;
        this.programmaError = false;
        if (newData && newData.length > 0) {
          this.hasProgramma = true;
          this.programma$.next(newData);
          this.sleutelMatch = newData.some((x) => x.kast);
        } else {
          // Geen nieuwe data, oude data blijft staan
          this.hasProgramma = false;
          // Alleen uitslagen ophalen als er geen programma is
          this.isLoadingUitslagen = true;
          this.programmaService.getUitslagen(7).subscribe({
            next: (newData: IUitslag[]) => {
              this.isLoadingUitslagen = false;
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
              this.isLoadingUitslagen = false;
              this.uitslagenError = true;
            },
          });
        }
      },
      error: () => {
        this.isLoadingProgramma = false;
        this.programmaError = true;
      },
    });
  }

  startProgressBar() {
    console.log("startProgressBar called");
    // Stop vorige interval als die er is
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }

    this.progress = 0;
    const step = 100 / (this.refreshInterval / 100);
    this.progressInterval = setInterval(() => {
      this.progress += step;
      if (this.progress >= 100) {
        this.progress = 0;
        this.refresh$.next();
      }
    }, 100);
  }

  private updateProgrammaData(newData: IWedstrijd[]) {
    const currentData = this.programma$.value;

    // Als er nog geen data is, gewoon de nieuwe data gebruiken
    if (!currentData || currentData.length === 0) {
      this.programma$.next(newData);
      return;
    }

    // Maak een map van de huidige wedstrijden voor snelle lookup
    const currentMap = new Map(currentData.map((w) => [w.wedstrijdcode, w]));
    const updatedData: IWedstrijd[] = [];

    // Update bestaande wedstrijden en voeg nieuwe toe
    for (const newWedstrijd of newData) {
      const existing = currentMap.get(newWedstrijd.wedstrijdcode);
      if (existing) {
        // Update alleen de velden die veranderd kunnen zijn
        const updated = { ...existing };
        if (newWedstrijd.status !== existing.status)
          updated.status = newWedstrijd.status;
        if (newWedstrijd.isGestart !== existing.isGestart)
          updated.isGestart = newWedstrijd.isGestart;
        if (newWedstrijd.afgelast !== existing.afgelast)
          updated.afgelast = newWedstrijd.afgelast;
        if (newWedstrijd.scheidsrechter !== existing.scheidsrechter)
          updated.scheidsrechter = newWedstrijd.scheidsrechter;
        if (newWedstrijd.veld !== existing.veld)
          updated.veld = newWedstrijd.veld;
        if (newWedstrijd.aanvangstijd !== existing.aanvangstijd)
          updated.aanvangstijd = newWedstrijd.aanvangstijd;
        if (newWedstrijd.kleedkamerthuisteam !== existing.kleedkamerthuisteam)
          updated.kleedkamerthuisteam = newWedstrijd.kleedkamerthuisteam;
        if (newWedstrijd.kleedkameruitteam !== existing.kleedkameruitteam)
          updated.kleedkameruitteam = newWedstrijd.kleedkameruitteam;
        if (
          newWedstrijd.kleedkamerscheidsrechter !==
          existing.kleedkamerscheidsrechter
        )
          updated.kleedkamerscheidsrechter =
            newWedstrijd.kleedkamerscheidsrechter;
        updatedData.push(updated);
      } else {
        // Nieuwe wedstrijd
        updatedData.push(newWedstrijd);
      }
    }

    this.programma$.next(updatedData);
  }

  // Prevent flickering: trackBy wedstrijdcode
  trackByWedstrijdCode(index: number, wedstrijd: IWedstrijd) {
    return wedstrijd.wedstrijdcode;
  }
}
