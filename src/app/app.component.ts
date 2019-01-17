import { Component, OnInit } from '@angular/core';
import { IWedstrijd } from './models/wedstrijd.model';
import { ProgrammaService } from './services/programma.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  programma: IWedstrijd[];

  constructor(private programmaService: ProgrammaService) {
  }

  ngOnInit(): void {
    this.programmaService.getProgramma().subscribe(data => this.programma = data);
  }
}
