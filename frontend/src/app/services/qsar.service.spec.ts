import { TestBed } from '@angular/core/testing';

import { QsarService } from './qsar.service';

describe('QsarService', () => {
  let service: QsarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QsarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
