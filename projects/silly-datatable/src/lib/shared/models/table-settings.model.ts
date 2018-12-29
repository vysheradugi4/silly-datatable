export class TableSettings {
  /**
   * Class will be added to <table> tag. Class for all table.
   */
  public tableClass?: string;

  /**
   * Class for first row of table for header. Will be added in first <tr> tag.
   */
  public headerRowClass?: string;

  /**
   * Class for each row in table except first (header) row. Will be added to each
   * <tr> tag except first.
   */
  public rowClass?: string;

  /**
   * Class for sortable header link. Will be added to <a> tag.
   */
  public sortHeaderClass?: string;

  /**
   * Class will be added to search `<input>` tag in search component.
   */
  public searchInputClass?: string;
}
