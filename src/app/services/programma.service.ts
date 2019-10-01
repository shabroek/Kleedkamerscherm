import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IWedstrijd } from '../models/wedstrijd.model';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUitslag } from '../models/uitslag.model';

@Injectable({
  providedIn: 'root'
})
export class ProgrammaService {

  programmaUrl = 'https://data.sportlink.com/programma?uit=NEE';
  uitslagenUrl = 'https://data.sportlink.com/uitslagen?uit=NEE';

  constructor(private http: HttpClient) {
  }
  getProgramma(days: number): Observable<IWedstrijd[]> {
    return this.http.get<IWedstrijd[]>(this.programmaUrl + '&aantaldagen=' + days).pipe(
      tap((programma: IWedstrijd[]) => programma.forEach(element => {
        element.kast = element.kleedkamerthuisteam.indexOf('A') > 0
        || element.kleedkamerthuisteam.indexOf('B') > 0
        || element.kleedkameruitteam.indexOf('A') > 0
        || element.kleedkameruitteam.indexOf('B') > 0; })),
      map((programma: IWedstrijd[]) => programma.sort(this.sortWedstrijd)));
  }

  getUitslagen(days: number): Observable<IUitslag[]> {
    return this.http.get<IUitslag[]>(this.uitslagenUrl + '&aantaldagen=' + days);
  }

  sortWedstrijd(a: IWedstrijd, b: IWedstrijd) {
    if (a.wedstrijddatum < b.wedstrijddatum) {
      return -1;
    }
    if (a.wedstrijddatum > b.wedstrijddatum) {
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
