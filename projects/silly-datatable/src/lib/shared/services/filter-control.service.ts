import { FormControl, FormGroup } from '@angular/forms';

import { FilterFormField } from './../models/filter-form-field.model';


export class FilterControlService {
  constructor() { }

  toFormGroup(filters: Array<FilterFormField>) {
    const group: any = {};

    filters.forEach(filter => {
      group[filter.name] = new FormControl(filter.value || '');
    });

    return new FormGroup(group);
  }
}
