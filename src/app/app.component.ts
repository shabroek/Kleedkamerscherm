import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProgramma } from './models/programma.model';
import { ProgrammaService } from './services/programma.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  programma: IProgramma[];

  constructor(private programmaService: ProgrammaService) {
  }

  ngOnInit(): void {
    this.programmaService.getProgramma().subscribe(data => this.programma = data);
  }
}
