import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetButtonComponent } from './get-button.component';

describe('GetButtonComponent', () => {
  let component: GetButtonComponent;
  let fixture: ComponentFixture<GetButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
