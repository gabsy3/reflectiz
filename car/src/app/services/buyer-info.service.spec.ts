import { TestBed } from '@angular/core/testing';

import { BuyerInfoService } from './buyer-info.service';

describe('BuyerInfoService', () => {
  let service: BuyerInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyerInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
