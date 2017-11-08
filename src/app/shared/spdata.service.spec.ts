import { TestBed, inject } from '@angular/core/testing';

import { SpdataService } from './spdata.service';

describe('SpdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpdataService]
    });
  });

  it('should be created', inject([SpdataService], (service: SpdataService) => {
    expect(service).toBeTruthy();
  }));
});
