import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { IUitslag } from "../models/uitslag.model";
import { IWedstrijd } from "../models/wedstrijd.model";

@Injectable({
  providedIn: "root",
})
export class ProgrammaService {
  private verwijderdeWedstrijden: string[] = [];

  programmaUrl = "https://data.sportlink.com/programma?uit=NEE";
  uitslagenUrl = "https://data.sportlink.com/uitslagen?uit=NEE";

  constructor(private http: HttpClient) {}
  getProgramma(days: number): Observable<IWedstrijd[]> {
    return this.http
      .get<IWedstrijd[]>(this.programmaUrl + "&aantaldagen=" + days)
      .pipe(
        tap((programma: IWedstrijd[]) =>
          programma.forEach((element) => {
            element.kast =
              element.kleedkamerthuisteam.indexOf("A") > 0 ||
              element.kleedkamerthuisteam.indexOf("B") > 0 ||
              element.kleedkameruitteam.indexOf("A") > 0 ||
              element.kleedkameruitteam.indexOf("B") > 0;
            // isGestart property
            element.isGestart = new Date(element.wedstrijddatum) <= new Date();
          })
        ),
        tap((programma: IWedstrijd[]) =>
          programma.forEach((element) => {
            element.afgelast = element.status?.startsWith("Afgelast");
          })
        ),
        map((programma: IWedstrijd[]) => programma.sort(this.sortWedstrijd))
      );
  }

  getUitslagen(days: number): Observable<IUitslag[]> {
    return this.http.get<IUitslag[]>(
      this.uitslagenUrl + "&aantaldagen=" + days
    );
  }

  sortWedstrijd(a: IWedstrijd, b: IWedstrijd) {
    const now = new Date();
    const aStart = new Date(a.wedstrijddatum);
    const bStart = new Date(b.wedstrijddatum);

    const aIsStarted = aStart <= now;
    const bIsStarted = bStart <= now;

    if (aIsStarted !== bIsStarted) {
      // Wedstrijden die al begonnen zijn komen onderaan
      return aIsStarted ? 1 : -1;
    }
    if (aStart < bStart) {
      return -1;
    }
    if (aStart > bStart) {
      return 1;
    }
    if (a.thuisteam < b.thuisteam) {
      return -1;
    }
    if (a.thuisteam > b.thuisteam) {
      return 1;
    }
    return 0;
  }
}
