import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SillyDatatableOptionsComponent } from './silly-datatable-options.component';
import { StoreService } from './../../services/store.service';
import { Column } from './../../models/column.model';


describe('SillyDatatableOptionsComponent', () => {
  let component: SillyDatatableOptionsComponent;
  let fixture: ComponentFixture<SillyDatatableOptionsComponent>;
  let columns = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [SillyDatatableOptionsComponent],
      providers: [
        StoreService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatableOptionsComponent);
    component = fixture.componentInstance;
    component.columns = columns;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  /**
   * ngOnInit.
   */
  it('should return throw error if colunms not defined', () => {
    let fixture2: ComponentFixture<SillyDatatableOptionsComponent>;
    fixture2 = TestBed.createComponent(SillyDatatableOptionsComponent);
    expect(() => fixture2.detectChanges()).toThrow(new Error('Columns of table not defined.'));
  });

  it('should add "show" property to columns object if thise property is absent', () => {
    columns = [
      { id: 'id1' } as Column,
      { id: 'id2' } as Column,
    ];
    component.columns = columns;
    component.ngOnInit();
    expect(component.columns[0].show).toBeTruthy();
  });

  it('should not change "show" property if defined', () => {
    columns = [
      { id: 'id1', show: false } as Column,
      { id: 'id2' } as Column,
    ];
    component.columns = columns;
    component.ngOnInit();
    expect(component.columns[0].show).toBeFalsy();
  });

  it('should not change "show" property if defined', () => {
    columns = [
      { id: 'id1', show: true } as Column,
      { id: 'id2' } as Column,
    ];
    component.columns = columns;
    component.ngOnInit();
    expect(component.columns[0].show).toBeTruthy();
  });

  it('should create form group from columns object', () => {
    columns = [
      { id: 'id1', show: true } as Column,
      { id: 'id2' } as Column,
    ];
    component.columns = columns;
    component.ngOnInit();
    expect(component.columnsForm).toBeDefined();
  });

  it('should not create form group for setup itemsPerPage parameter', () => {
    component.ngOnInit();
    expect(component.itemsPerPageControl).toBeUndefined();
  });

  it('should create form group for setup itemsPerPage parameter', () => {
    component.itemsPerPage = 10;
    component.ngOnInit();
    expect(component.itemsPerPageControl).toBeDefined();
  });

  /**
   * Columns state changed functional.
   */
  it('should emit new columns object when changed columns state', (done) => {
    component.columns = [
      { id: 'id1', show: true } as Column,
    ];
    component.ngOnInit();
    component.columnsChanged$.subscribe((changedColumns: Array<Column>) => {
      expect(changedColumns[0].show).toBeFalsy();
      done();
    });

    component.columnsForm.setValue({ id1: false });
  });

  /**
   * ItemsPerPage changed functional.
   */
  it('should emit new itemsPerPage value', (done) => {
    component.itemsPerPage = 10;
    component.itemsPerPageList = [10, 30, 50];
    component.ngOnInit();
    component.itemsPerPageChanged$.subscribe((itemsPerPage) => {
      expect(itemsPerPage).toBe(30);
      done();
    });

    component.itemsPerPageControl.setValue(30);
  });
});
