import { FormControl, FormGroup } from '@angular/forms';


export class FormsHelper {

  constructor() { }

  public static toFormGroup(list: Array<any>, nameKey: string, valueKey: string, disabledKey = ''): FormGroup {
    if (!list || !list.length) {
      return new FormGroup({});
    }


    const group: any = {};

    list.forEach(item => {
      group[item[nameKey]] = new FormControl(
        { value: item[valueKey] || '', disabled: item[disabledKey] || false }
      );
    });

    return new FormGroup(group);
  }
}
