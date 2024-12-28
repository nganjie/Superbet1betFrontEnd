import { TestBed } from '@angular/core/testing';

import { CountTimeService } from './count-time.service';

describe('CountTimeService', () => {
  let service: CountTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
