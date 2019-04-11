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


  /**
   * Activator of batch select functional.
   */
  public batchSelect?: boolean;


  /**
   * Css class name for th element as container of selectAll checkbox.
   */
  public selectAllThClass?: string;


  /**
   * Css class name for div container of selectAll checkbox.
   */
  public selectAllContainerClass?: string;


  /**
   * Css class name for "select all" input checkbox.
   */
  public selectAllCheckboxClass?: string;


  /**
   * Css class name for td element as container with row checkbox of batch
   * select logic.
   */
  public batchSelectTdClass?: string;


  /**
   * Css class name for div container of batch select checkbox.
   */
  public batchSelectCheckboxContainerClass?: string;


  /**
   * Css class name for row checkbox of batch select logic.
   */
  public batchSelectCheckboxClass?: string;
}
