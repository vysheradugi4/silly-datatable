import { SillyDatatableModule } from 'silly-datatable';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePagingComponent } from './table-paging.component';

describe('TablePagingComponent', () => {
  let component: TablePagingComponent;
  let fixture: ComponentFixture<TablePagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SillyDatatableModule,
      ],
      declarations: [ TablePagingComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
