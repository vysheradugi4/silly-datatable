import { TestBed } from '@angular/core/testing';

import { OptionsService } from './options.service';
import { OptionsMockService } from './options-mock.service';


describe('OptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: OptionsService,
        useClass: OptionsMockService,
      },
    ],
  }));

  it('should be created', () => {
    const service: OptionsService = TestBed.get(OptionsService);
    expect(service).toBeTruthy();
  });
});
