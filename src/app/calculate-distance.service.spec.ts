import { TestBed } from '@angular/core/testing';

import { CalculateDistanceService } from './calculate-distance.service';

describe('CalculateDistanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculateDistanceService = TestBed.get(CalculateDistanceService);
    expect(service).toBeTruthy();
  });
});
