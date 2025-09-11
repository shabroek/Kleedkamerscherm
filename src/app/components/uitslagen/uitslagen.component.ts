import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUitslag } from '../../models/uitslag.model';

@Component({
  selector: 'app-uitslagen',
  templateUrl: './uitslagen.component.html',
  styleUrls: ['./uitslagen.component.scss']
})
export class UitslagenComponent implements OnInit {
  @Input() uitslagen$!: Observable<IUitslag[]>;
  @Input() isLoading: boolean = false;

  ngOnInit(): void {
  }

  trackByUitslagId(index: number, uitslag: IUitslag): any {
    return uitslag.wedstrijdcode;
  }
}
