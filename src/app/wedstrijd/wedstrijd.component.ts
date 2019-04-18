import { Component, OnInit, Input } from '@angular/core';
import { IWedstrijd } from '../models/wedstrijd.model';

@Component({
  selector: 'app-wedstrijd',
  templateUrl: './wedstrijd.component.html',
  styleUrls: ['./wedstrijd.component.scss']
})
export class WedstrijdComponent implements OnInit {
  component: { thuisteam: string; };

  constructor() { }

  @Input() wedstrijd: IWedstrijd;

  ngOnInit() {
  }

}
