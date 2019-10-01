
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IWedstrijd } from './models/wedstrijd.model';
import { ProgrammaService } from './services/programma.service';
import { KleedkamerPipe } from './pipes/kleedkamer.pipe';
import { VeldPipe } from './pipes/veld.pipe';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { IUitslag } from './models/uitslag.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  programma$: Observable<IWedstrijd[]>;
  kleedkamer: KleedkamerPipe;
  veld: VeldPipe;
  sleutelMatch: boolean;
  hasUitslagen: boolean;
  hasProgramma: boolean;
  uitslagen$: Observable<IUitslag[]>;
  numberOfDays: number;

  constructor(private programmaService: ProgrammaService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      filter(params => params.days),
      map(params => params.days),
      tap((numberOfDays: number) => this.numberOfDays = numberOfDays),
      tap((numberOfDays: number) => this.laadData(numberOfDays))
    ).subscribe();

    this.hasProgramma = true;
    this.hasUitslagen = true;
    this.laadData(0);
    this.startTimer();
  }

  private laadData(days: number) {
    this.programma$ = this.programmaService.getProgramma(days).pipe(
      tap((data: IWedstrijd[]) => { this.hasProgramma = data.length > 0; }),
      tap((data: IWedstrijd[]) => { this.sleutelMatch = data.some(x => x.kast); })
    );
    this.uitslagen$ = this.programmaService.getUitslagen(days).pipe(
      tap((data: IUitslag[]) => { this.hasUitslagen = data.length > 0; })
    );
  }

  startTimer() {
    setInterval(() => this.laadData(this.numberOfDays), 120000);
  }
}
