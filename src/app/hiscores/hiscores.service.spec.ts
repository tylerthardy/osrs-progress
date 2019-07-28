import { TestBed } from '@angular/core/testing';

import { HiscoresService } from './hiscores.service';

describe('HiscoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HiscoresService = TestBed.get(HiscoresService);
    expect(service).toBeTruthy();
  });
});
