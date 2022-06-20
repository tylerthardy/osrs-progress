import { TestBed } from '@angular/core/testing';

import { MagicCastCalculatorService } from './magic-cast-calculator.service';

describe('MagicCastCalculatorService', () => {
  let service: MagicCastCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagicCastCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
