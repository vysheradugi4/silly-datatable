import { TestBed } from '@angular/core/testing';

import { SillyDatatableService } from './silly-datatable.service';

describe('SillyDatatableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SillyDatatableService = TestBed.get(SillyDatatableService);
    expect(service).toBeTruthy();
  });
});
