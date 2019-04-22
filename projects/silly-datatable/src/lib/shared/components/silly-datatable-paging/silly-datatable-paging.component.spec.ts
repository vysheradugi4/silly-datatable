import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SillyDatatablePagingComponent } from './silly-datatable-paging.component';
import { PipesModule } from './../../pipes/pipes.module';
import { TableParams } from './../../models/table-params.model';
import { Pagination } from './../../../shared/models/pagination.model';


describe('SillyDatatablePagingComponent', () => {
  let component: SillyDatatablePagingComponent;
  let fixture: ComponentFixture<SillyDatatablePagingComponent>;

  const tableParams = new TableParams();
  tableParams.pagination = new Pagination();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PipesModule,
      ],
      declarations: [SillyDatatablePagingComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatablePagingComponent);
    component = fixture.componentInstance;
    component.pagination = new Pagination();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  /**
   * ngOnInit.
   */

  it('should emit pageUpdated when call pageRequest method', (done) => {
    component.pageUpdated$.subscribe((page: number) => {
      expect(page).toBe(4);
      done();
    });

    component.pageRequest(4);
  });

  /**
   * Current page.
   */
  it('should equal pagination page and current page', () => {
    component.pagination.pageNumber = 1;
    expect(component.pagination.pageNumber).toBe(component.currentPage);
  });

  it('should return 0 if page is negative', () => {
    component.pagination.pageNumber = -3;
    component.pagination.pageCount = 10;
    expect(component.currentPage).toBe(0);
  });

  it('should return 0 if page more than pages count', () => {
    component.pagination.pageNumber = 10; // Page number start with 0;
    component.pagination.pageCount = 10;
    expect(component.currentPage).toBe(0);
  });

  /**
   * Number of pages.
   */
  it('should equal pagination pages and numberOfPages', () => {
    component.pagination.pageCount = 10;
    expect(component.pagination.pageCount).toBe(component.numberOfPages);
  });

  /**
   * Start of slice.
   */
  it('should return 0 for current page < 1', () => {
    component.pagination.pageNumber = 0;
    expect(component.start).toBe(0);
  });

  it('should return 0 for undefined pages', () => {
    component.pagination.pageNumber = 1;
    expect(component.start).toBe(0);
  });

  it('should return 0 for current page = 1', () => {
    component.pagination.pageNumber = 1;
    component.pagination.pageCount = 20;
    expect(component.start).toBe(0);
  });

  it('should return 0 for current page = 2', () => {
    component.pagination.pageNumber = 2;
    component.pagination.pageCount = 20;
    expect(component.start).toBe(0);
  });

  it('should return 1 for current page = 3', () => {
    component.pagination.pageNumber = 3;
    component.pagination.pageCount = 20;
    expect(component.start).toBe(1);
  });

  it('should return 5 for current page = 7, end of pagination', () => {
    component.pagination.pageNumber = 7;
    component.pagination.pageCount = 10;
    expect(component.start).toBe(5);
  });

  it('should return 5 for current page = 8, end of pagination', () => {
    component.pagination.pageNumber = 8;
    component.pagination.pageCount = 10;
    expect(component.start).toBe(5);
  });

  it('should return 5 for current page = 9, end of pagination', () => {
    component.pagination.pageNumber = 9;
    component.pagination.pageCount = 10;
    expect(component.start).toBe(5);
  });

  /**
   * End of slice.
   */
  it('should return 5 for current page = 0', () => {
    component.pagination.pageNumber = 0;
    component.pagination.pageCount = 10;
    expect(component.end).toBe(5);
  });

  it('should return 5 for current page = 1', () => {
    component.pagination.pageNumber = 1;
    component.pagination.pageCount = 10;
    expect(component.end).toBe(5);
  });

  it('should return 5 for current page = 2', () => {
    component.pagination.pageNumber = 2;
    component.pagination.pageCount = 10;
    expect(component.end).toBe(5);
  });

  it('should return 6 for current page = 3', () => {
    component.pagination.pageNumber = 3;
    component.pagination.pageCount = 10;
    expect(component.end).toBe(6);
  });

  it('should return 7 for current page = 4', () => {
    component.pagination.pageNumber = 4;
    component.pagination.pageCount = 10;
    expect(component.end).toBe(7);
  });

  /**
   * Arrows
   */
  it('should hide "to start" arrow button for page = 0', () => {
    component.pagination.pageNumber = 0;
    component.pagination.pageCount = 10;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#start');
    expect(button).toBeNull();
  });

  it('should hide "to prev" arrow button for page = 0', () => {
    component.pagination.pageNumber = 0;
    component.pagination.pageCount = 10;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#prev');
    expect(button).toBeNull();
  });

  it('should show "to start" arrow button for page = 1', () => {
    const pagination: Pagination = {
      pageNumber: 1,
      pageCount: 10,
      itemsPerPage: 10,
    };
    component.pagination = pagination;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#start');
    expect(button).toBeTruthy();
  });

  it('should show "to prev" arrow button for page = 1', () => {
    const pagination: Pagination = {
      pageNumber: 1,
      pageCount: 10,
      itemsPerPage: 10,
    };
    component.pagination = pagination;

    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#prev');
    expect(button).toBeTruthy();
  });

  it('should hide "to next" arrow button for page = 9 and pages = 10', () => {
    component.pagination.pageNumber = 9;
    component.pagination.pageCount = 10;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#next');
    expect(button).toBeNull();
  });

  it('should hide "to last" arrow button for page = 9 and pages = 10', () => {
    component.pagination.pageNumber = 9;
    component.pagination.pageCount = 10;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#last');
    expect(button).toBeNull();
  });
});
