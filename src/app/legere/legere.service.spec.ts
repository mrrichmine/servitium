import { TestBed, inject } from '@angular/core/testing';

import { LegereService } from './legere.service';

describe('LegereService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LegereService]
    });
  });

  it('should ...', inject([LegereService], (service: LegereService) => {
    expect(service).toBeTruthy();
  }));
});
