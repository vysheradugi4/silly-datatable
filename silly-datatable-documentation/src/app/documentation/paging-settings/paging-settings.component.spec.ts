import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingSettingsComponent } from './paging-settings.component';

describe('PagingSettingsComponent', () => {
  let component: PagingSettingsComponent;
  let fixture: ComponentFixture<PagingSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagingSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
