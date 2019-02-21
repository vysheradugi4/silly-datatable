import { FormControl, FormGroup } from '@angular/forms';

import { FilterFormField } from './../models/filter-form-field.model';


export class FilterControlService {

  constructor() { }

  toFormGroup(filters: Array<FilterFormField>): FormGroup {
    if (!filters || !filters.length) {
      return null;
    }

    const group: any = {};

    filters.forEach(filter => {
      group[filter.name] = new FormControl(
        { value: filter.value || '', disabled: filter.disabled }
      );
    });

    return new FormGroup(group);
  }
}
