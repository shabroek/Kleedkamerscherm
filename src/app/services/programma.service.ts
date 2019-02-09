import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IWedstrijd } from '../models/wedstrijd.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgrammaService {
  programmaUrl = 'https://data.sportlink.com/programma?uit=NEE';

  constructor(private http: HttpClient) {
  }
  getProgramma(days: number): Observable<IWedstrijd[]> {
    return this.http.get<IWedstrijd[]>(this.programmaUrl + '&aantaldagen=' + days).pipe(
      map(programma => programma.sort(this.sortByName)));
  }

  sortByName(a: IWedstrijd, b: IWedstrijd) {
    if (a.thuisteam < b.thuisteam) {
      return -1;
    }
    if (a.thuisteam > b.thuisteam) {
      return 1;
    }
    return 0;
  }
}
