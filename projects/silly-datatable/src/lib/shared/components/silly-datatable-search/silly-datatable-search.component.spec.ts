import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SillyDatatableSearchComponent } from './silly-datatable-search.component';
import { RequestService } from './../../../shared/services/request.service';


describe('SillyDatatableSearchComponent', () => {
  let component: SillyDatatableSearchComponent;
  let fixture: ComponentFixture<SillyDatatableSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [ SillyDatatableSearchComponent ],
      providers: [
        RequestService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
