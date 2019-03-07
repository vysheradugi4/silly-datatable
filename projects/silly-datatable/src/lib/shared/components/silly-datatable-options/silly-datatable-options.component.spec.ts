import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SillyDatatableOptionsComponent } from './silly-datatable-options.component';
import { OptionsMockService } from './../../services/options-mock.service';
import { OptionsService } from './../../services/options.service';


describe('SillyDatatableOptionsComponent', () => {
  let component: SillyDatatableOptionsComponent;
  let fixture: ComponentFixture<SillyDatatableOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [SillyDatatableOptionsComponent],
      providers: [
        {
          provide: OptionsService,
          useClass: OptionsMockService,
        },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatableOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
