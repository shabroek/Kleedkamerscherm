import { TestBed } from '@angular/core/testing';

import { ProgrammaService } from './programma.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProgrammaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ProgrammaService = TestBed.get(ProgrammaService);
    expect(service).toBeTruthy();
  });
});
