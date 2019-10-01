import { Component, OnInit } from '@angular/core';
import { IWedstrijd } from './models/wedstrijd.model';
import { ProgrammaService } from './services/programma.service';
import { KleedkamerPipe } from './pipes/kleedkamer.pipe';
import { VeldPipe } from './pipes/veld.pipe';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  constructor(private programmaService: ProgrammaService) {
  }

  ngOnInit(): void {
    this.hasProgramma = true;
    this.hasUitslagen = true;
    this.laadData();
    this.startTimer();
  }

  private laadData() {
    this.programma$ = this.programmaService.getProgramma(0).pipe(
      tap((data: IWedstrijd[]) => { this.hasProgramma = data.length > 0; }),
      tap((data: IWedstrijd[]) => { this.sleutelMatch = data.some(x => x.kast); })
    );
    this.uitslagen$ = this.programmaService.getUitslagen(0).pipe(
      tap((data: IUitslag[]) => { this.hasUitslagen = data.length > 0; })
    );
  }

  startTimer() {
    setInterval(() => this.laadData(), 120000);
  }
}
