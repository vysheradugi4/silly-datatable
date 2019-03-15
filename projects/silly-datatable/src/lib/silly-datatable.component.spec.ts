import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SillyDatatableComponent } from './silly-datatable.component';
import { ComponentsModule } from './shared/components/components.module';
import { TableParams } from './shared/models/table-params.model';
import { PipesModule } from './shared/pipes/pipes.module';


describe('SillyDatatableComponent', () => {
  let component: SillyDatatableComponent;
  let fixture: ComponentFixture<SillyDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
        PipesModule,
      ],
      declarations: [SillyDatatableComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatableComponent);
    component = fixture.componentInstance;
    component.id = 'sole';
    (component as SillyDatatableComponent).tableParams = new TableParams();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  /**
   * ngOnInit
   */

  it('onInit should return throw when id not defined', () => {
    const fixture2 = TestBed.createComponent(SillyDatatableComponent);
    component = fixture2.componentInstance;
    expect(() => fixture2.detectChanges()).toThrow(new Error('Table id required.'));
  });

  it('onInit should return throw when tableParams not defined', () => {
    const fixture2 = TestBed.createComponent(SillyDatatableComponent);
    component = fixture2.componentInstance;
    component.id = 'sole';
    expect(() => fixture2.detectChanges()).toThrow(new Error('Table params required.'));
  });


  /**
   * Sort.
   */

  it('sortEnable should add sort param with columnName `name` in tableParams object', () => {
    let tableParams: TableParams;

    component.request.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    expect(tableParams.sort.columnName).toBe('name');
  });

  it('sortEnable should add sort param with isAsc param equal true in tableParams object', () => {
    let tableParams: TableParams;

    component.request.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    expect(tableParams.sort.isAsc).toBe(true);
  });

  it('sortEnable should change column name to `age`', () => {
    let tableParams: TableParams;

    component.request.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    component.sortEnable('age');
    expect(tableParams.sort.columnName).toBe('age');
  });

  it('sortEnable should change isAsc to true when change name to `age`', () => {
    let tableParams: TableParams;

    component.request.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    component.sortEnable('name');
    component.sortEnable('age');
    expect(tableParams.sort.isAsc).toBeTruthy();
  });


  /**
   * Click by row.
   */

  it('should call rowClicked', (done) => {
    component.rowClicked.subscribe((clickedRow) => {
      expect(clickedRow).toEqual({ id: 1 });
      done();
    });

    component.clicked({ id: 1 });
  });

  it('should return undefined when row is not defined', () => {
    expect(component.clicked(undefined)).toBeUndefined();
  });


  it('should not emit rowClicked if double click', fakeAsync(() => {
    let row: any;

    component.rowClicked.subscribe((clickedRow) => {
      row = clickedRow;
    });

    component.clicked({ id: 1 });
    component.doubleClicked({ id: 1 });

    tick(500);

    fixture.whenStable().then(() => {
      expect(row).toBeUndefined();
    });
  }));

  it('should emit rowDoubleClicked event emitter', () => {
    let row: any;

    component.rowDoubleClicked.subscribe((clickedRow) => {
      row = clickedRow;
    });

    component.doubleClicked({ id: 1 });
    expect(row).toEqual({ id: 1 });
  });

  /**
   * Custom component cell event emit.
   */

  it('should emit componentCellEvent', () => {
    let row: any;

    component.componentCellEvent.subscribe((event) => {
      row = event;
    });
    component.onComponentCellEvent({ edit: 5 });
    expect(row).toEqual({ edit: 5 });
  });
});
