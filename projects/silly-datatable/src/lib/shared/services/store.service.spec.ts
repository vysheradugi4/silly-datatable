import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';

describe('StoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      StoreService,
    ],
  }));

  it('should be created', () => {
    const service: StoreService = TestBed.get(StoreService);
    expect(service).toBeTruthy();
  });

  it('should create field in localStorage', () => {
    const service: StoreService = TestBed.get(StoreService);
    const data = { id: 5 };
    service.storeState('field', 'id', data);
    expect(JSON.parse(localStorage.getItem('field_id'))).toEqual(data);
    localStorage.removeItem('field_id');
  });

  it('should get data by field and id from localStorage', () => {
    const service: StoreService = TestBed.get(StoreService);
    const data = { id: 5 };
    localStorage.setItem('field_id', JSON.stringify(data));
    const result = service.getStateFromStorage('field', 'id');
    expect(result).toEqual(data);
    localStorage.removeItem('field_id');
  });

  it('should return null when key is absent in localStorage', () => {
    const service: StoreService = TestBed.get(StoreService);
    const result = service.getStateFromStorage('field', 'id');
    expect(result).toBeNull();
  });

  it('should check localStorage contain record', () => {
    const service: StoreService = TestBed.get(StoreService);
    const data = { id: 5 };
    localStorage.setItem('field_id', JSON.stringify(data));
    const result = service.isStored('field', 'id');
    expect(result).toBeTruthy();
    localStorage.removeItem('field_id');
  });

  it('should check localStorage not contain record', () => {
    const service: StoreService = TestBed.get(StoreService);
    const result = service.isStored('field', 'id');
    expect(result).toBeFalsy();
  });

  it('should create concatenated key from two strings', () => {
    const service: StoreService = TestBed.get(StoreService);
    const key = (service as any).getKey('field', 'id');
    expect(key).toBe('field_id');
  });
});
