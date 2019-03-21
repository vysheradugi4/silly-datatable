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
   * Text under heading when data is not found ('Data not found' by default).
   */
  public dataNotFoundPhrase?: string;

  /**
   * List of possible counts of items per page.
   */
  public itemsPerPageList?: Array<number>;
}
