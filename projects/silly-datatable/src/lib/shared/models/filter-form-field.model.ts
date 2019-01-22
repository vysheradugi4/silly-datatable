import { TemplateRef } from '@angular/core';


export class FilterFormField {
  public id: string;
  public name: string;
  public type: string;


  /**
   * Initial value of form field.
   */
  public value?: string | Array<any>;


  /**
   * Placeholder of  form field.
   */
  public placeholder?: string;


  /**
   * Form field class.
   */
  public controlClass?: string;


  /**
   * Combine label and form field.
   */
  public formGroupClass?: string;


  /**
   * Div container of form field class.
   */
  public controlContainerClass?: string;


  /**
   * Label container class.
   */
  public labelContainerClass?: string;


  /**
   * Title in label.
   */
  public formControlLabel?: string;


  /**
   * Custom input template.
   */
  public customInput?: TemplateRef<any>;


  /**
   * Disable form field.
   */
  public disabled: boolean;
}
