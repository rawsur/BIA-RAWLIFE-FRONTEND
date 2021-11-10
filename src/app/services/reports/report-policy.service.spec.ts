import { TestBed } from '@angular/core/testing';

import { ReportPolicyService } from './report-policy.service';

describe('ReportPolicyService', () => {
  let service: ReportPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
