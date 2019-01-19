import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IWedstrijd } from '../models/wedstrijd.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgrammaService {
  programmaUrl = 'https://data.sportlink.com/programma?aantaldagen=300&uit=NEE';

  constructor(private http: HttpClient) {
  }
  getProgramma(): Observable<IWedstrijd[]> {
    return this.http.get<IWedstrijd[]>(this.programmaUrl);
  }
}
