import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {

  it('should create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return original array if key not defined', () => {
    const pipe = new FilterPipe();
    const arr = [
      { id: 1, hide: true },
      { id: 2, hide: true },
      { id: 3, hide: true },
    ];

    expect(pipe.transform(arr, null)).toBeTruthy(arr);
  });

  it('should return empty array if original array not defined', () => {
    const pipe = new FilterPipe();

    expect(pipe.transform(null, null)).toEqual([]);
  });

  it('should return one element in changed array', () => {
    const pipe = new FilterPipe();

    const arr = [
      { id: 1, show: false },
      { id: 2, show: false },
      { id: 3, show: true },
    ];

    expect(pipe.transform(arr, 'show').length).toEqual(1);
  });

  it('should return two element in changed array, in second element key not defined', () => {
    const pipe = new FilterPipe();

    const arr = [
      { id: 1, show: true },
      { id: 2 },
      { id: 3, show: false },
    ];

    expect(pipe.transform(arr, 'show').length).toEqual(2);
  });

  it('should return element with id = 1', () => {
    const pipe = new FilterPipe();

    const arr = [
      { id: 1, show: true },
      { id: 2, show: false },
      { id: 3, show: false },
    ];

    expect(pipe.transform(arr, 'show')[0].id).toEqual(1);
  });
});
