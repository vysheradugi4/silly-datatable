import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersOutputComponent } from './filters-output.component';

describe('FiltersOutputComponent', () => {
  let component: FiltersOutputComponent;
  let fixture: ComponentFixture<FiltersOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
