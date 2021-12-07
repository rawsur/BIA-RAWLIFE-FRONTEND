import { TestBed } from '@angular/core/testing';

import { ReportInsuranceService } from './report-insurance.service';

describe('ReportInsuranceService', () => {
  let service: ReportInsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportInsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
