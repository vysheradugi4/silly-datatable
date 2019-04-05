import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSettingsComponent } from './filter-settings.component';

describe('FilterSettingsComponent', () => {
  let component: FilterSettingsComponent;
  let fixture: ComponentFixture<FilterSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
