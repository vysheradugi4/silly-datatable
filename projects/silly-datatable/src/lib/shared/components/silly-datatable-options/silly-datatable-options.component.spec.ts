import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SillyDatatableOptionsComponent } from './silly-datatable-options.component';
import { StoreService } from './../../services/store.service';


describe('SillyDatatableOptionsComponent', () => {
  let component: SillyDatatableOptionsComponent;
  let fixture: ComponentFixture<SillyDatatableOptionsComponent>;

  const columns = [];

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
