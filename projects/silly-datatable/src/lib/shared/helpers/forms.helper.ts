import { FormControl, FormGroup, FormArray } from '@angular/forms';


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


  public static toFormArray(list: Array<any>, valueKey: string, disabledKey = ''): FormArray {
    const formArray = new FormArray([]);

    if (!list || !list.length) {
      return formArray;
    }


    list.forEach(item => {
      formArray.push(
        new FormControl(
          { value: item[valueKey] || '', disabled: item[disabledKey] || false }
        )
      );
    });

    return formArray;
  }
}
