import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { KleedkamerPipe } from './pipes/kleedkamer.pipe';
import { JongbrabantPipe } from './pipes/jongbrabant.pipe';
import { KastPipe } from './pipes/kast.pipe';
import { VeldPipe } from './pipes/veld.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        KleedkamerPipe,
        JongbrabantPipe,
        KastPipe,
        VeldPipe],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
