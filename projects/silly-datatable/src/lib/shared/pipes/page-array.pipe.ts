import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'pageArray',
})
export class PageArrayPipe implements PipeTransform {
  transform(value: number): number[] {
    if (!value) {
      return [];
    }

    return Array.from({ length: value }, (_, i) => ++i);
  }
}
