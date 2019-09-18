import { Component, OnInit } from '@angular/core';
import { IWedstrijd } from './models/wedstrijd.model';
import { ProgrammaService } from './services/programma.service';
import { JongbrabantPipe } from './pipes/jongbrabant.pipe';
import { KleedkamerPipe } from './pipes/kleedkamer.pipe';
import { VeldPipe } from './pipes/veld.pipe';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  constructor(private programmaService: ProgrammaService) {
  }

  ngOnInit(): void {
    this.getProgramma();
    this.startTimer();
  }

  getProgramma(): any {
    this.programma$ = this.programmaService.getProgramma(10).pipe(
      tap((data: IWedstrijd[]) => { this.sleutelMatch = data.some(x => x.kast); })
    );
  }
  startTimer() {
    setInterval(() => this.getProgramma(), 60000);
  }
}
