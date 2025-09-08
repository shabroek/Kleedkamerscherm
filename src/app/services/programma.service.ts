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

    // First: separate started matches (they go to bottom)
    if (aIsStarted !== bIsStarted) {
      return aIsStarted ? 1 : -1;
    }

    // Second: sort by time (earliest first)
    if (aStart < bStart) {
      return -1;
    }
    if (aStart > bStart) {
      return 1;
    }

    // Third: sort by field (VELD) - matches with field come first
    const aHasVeld = a.veld && a.veld.trim() !== "";
    const bHasVeld = b.veld && b.veld.trim() !== "";

    if (aHasVeld && !bHasVeld) {
      return -1; // a has field, b doesn't - a comes first
    }
    if (!aHasVeld && bHasVeld) {
      return 1; // b has field, a doesn't - b comes first
    }

    // Both have fields or both don't have fields
    if (aHasVeld && bHasVeld) {
      // Both have fields - sort by field name
      if (a.veld < b.veld) {
        return -1;
      }
      if (a.veld > b.veld) {
        return 1;
      }
    }

    // Fourth: if same time and same field status, sort by home team name
    if (a.thuisteam < b.thuisteam) {
      return -1;
    }
    if (a.thuisteam > b.thuisteam) {
      return 1;
    }

    return 0;
  }
}
