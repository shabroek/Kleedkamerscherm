import { Component, OnInit } from '@angular/core';
import { IWedstrijd } from './models/wedstrijd.model';
import { ProgrammaService } from './services/programma.service';
import { JongbrabantPipe } from './pipes/jongbrabant.pipe';
import { KleedkamerPipe } from './pipes/kleedkamer.pipe';
import { VeldPipe } from './pipes/veld.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  programma: IWedstrijd[];
  jongbrabant: JongbrabantPipe;
  kleedkamer: KleedkamerPipe;
  veld: VeldPipe;

  constructor(private programmaService: ProgrammaService) {
  }

  ngOnInit(): void {
    this.startTimer();
  }

  getProgramma(): any {
    this.programmaService.getProgramma(3).subscribe(data => this.programma = data);
  }
  startTimer() {
    setInterval(() => this.getProgramma(), 60000);
  }
}
