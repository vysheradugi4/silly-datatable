import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<any>, key: string): any {
    if (!value) {
      return [];
    }

    if (!key) {
      return value;
    }

    const arr =  value.filter(item => (!item[key] && item[key] !== false) || item[key] === true);
    return arr;
  }
}
