import { TestBed, inject } from '@angular/core/testing';

import { ColloquimService } from './colloquim.service';

describe('ColloquimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColloquimService]
    });
  });

  it('should ...', inject([ColloquimService], (service: ColloquimService) => {
    expect(service).toBeTruthy();
  }));
});
