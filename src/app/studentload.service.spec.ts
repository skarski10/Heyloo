import { TestBed, inject } from '@angular/core/testing';

import { StudentloadService } from './studentload.service';

describe('StudentloadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentloadService]
    });
  });

  it('should be created', inject([StudentloadService], (service: StudentloadService) => {
    expect(service).toBeTruthy();
  }));
});
