import { TestBed } from '@angular/core/testing';

import { MarkedServiceService } from './marked-service.service';

describe('MarkedServiceService', () => {
  let service: MarkedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
