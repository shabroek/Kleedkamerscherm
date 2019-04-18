import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WedstrijdComponent } from './wedstrijd.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { JongbrabantPipe } from '../pipes/jongbrabant.pipe';

describe('WedstrijdComponent', () => {
  let component: WedstrijdComponent;
  let fixture: ComponentFixture<WedstrijdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WedstrijdComponent, JongbrabantPipe ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WedstrijdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.wedstrijd = { thuisteam: 'Jong Brabant', uitteam: 'VOAB', aanvangstijd: 1, };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
