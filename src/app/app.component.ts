import { Component, OnInit } from '@angular/core';
import { IWedstrijd } from './models/wedstrijd.model';
import { ProgrammaService } from './services/programma.service';
import { JongbrabantPipe } from './pipes/jongbrabant.pipe';
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
  jongbrabant: JongbrabantPipe;
  kleedkamer: KleedkamerPipe;
  veld: VeldPipe;
  sleutelMatch: boolean;
  hasUitslagen: boolean;
  uitslagen$: Observable<IUitslag[]>;

  constructor(private programmaService: ProgrammaService) {
  }

  ngOnInit(): void {
    this.laadData();
    this.startTimer();
  }

  private laadData() {
    this.getProgramma();
    this.getUitslagen();
  }

  getProgramma(): any {
    this.programma$ = this.programmaService.getProgramma(7).pipe(
      tap((data: IWedstrijd[]) => { this.sleutelMatch = data.some(x => x.kast); })
    );
  }

  getUitslagen(): any {
    this.uitslagen$ = this.programmaService.getUitslagen(7).pipe(
      tap((data: IUitslag[]) => { this.hasUitslagen = data.length > 0; })
    );
  }

  startTimer() {
    setInterval(() => this.laadData(), 120000);
  }
}
