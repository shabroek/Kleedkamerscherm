import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProgramma } from '../models/programma.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgrammaService {
  programmaUrl = 'https://data.sportlink.com/programma?client_id=uGmAb4311c&leeftijdscategorie=senioren&aantaldagen=3&uit=NEE';

  constructor(private http: HttpClient) {
  }
    getProgramma(): Observable<IProgramma[]> {
      return this.http.get<IProgramma[]>(this.programmaUrl);
  }
}
