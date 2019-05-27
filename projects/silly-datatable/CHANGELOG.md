# Silly Datatable Change Log

## 3.3.4

    Added label class for batch select checkboxes.

## 3.3.0

    Prepare cell function added new parameters.

## 3.2.9

    Table params requests as copy without sourse array now.

## 3.2.7

    Added second parameter in prepareCellFunction with current row.

## 3.1.0 (2019-04-10)

    Added batch select logic.

## 3.0.0 (2019-03-21)

    Changed few fields in Pagination (page to pageNumber, pages to pageCount),
    Sort (isAsc to isDesc), TableParams (search to searchText). Changed relations
    with silly-datatable component and filter, search, pagination, options.

## 2.1.7 (2019-03-11)

    Table id is required now.

## 2.1.4 (2019-03-11)

    Corrected parameters for class names in options component.

## 2.1.0 (2019-03-06)

    Added new property in column object - show. For control the display of the
    column. Added functional for manage of show columns and count items per page.

## 1.9.8 (2019-02-26)

    Changed in Sort object field for define sort direction. New field has name
    isAsc and it boolean. Order field has been removed.

## 1.9.6 (2019-02-22)

    Combined TableParams with source in one object of TableParams type. Fixed
    catch first empty string in search and filters field.

## 1.9.5 (2019-02-21)

    Removed internal service for storing settings for incapsulation settings 
    of table when tables more than one in component template. Fixed unit tests.