import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SillyDatatableSearchComponent } from './silly-datatable-search.component';
import { skip } from 'rxjs/operators';


describe('SillyDatatableSearchComponent', () => {
  let component: SillyDatatableSearchComponent;
  let fixture: ComponentFixture<SillyDatatableSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [SillyDatatableSearchComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatableSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  /**
   * Disabled
   */

  it('should disable input control in template', () => {
    fixture.detectChanges();
    component.disabled = true;

    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.disabled).toBeTruthy();
  });

  it('should enable input control after time in template (check input setter)', fakeAsync(() => {
    fixture.detectChanges();
    component.disabled = true;
    tick(300);
    component.disabled = false;

    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.disabled).toBeFalsy();
  }));

  /**
   * Input id
   */
  it('should set id to input control', async(() => {
    component.inputId = 'search';
    fixture.detectChanges();

    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.id).toBe('search');

  }));

  /**
   * Placeholder
   */
  it('should set id to input control', async(() => {
    component.placeholder = 'Search...';
    fixture.detectChanges();

    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.placeholder).toBe('Search...');

  }));

  /**
   * Set classes on elements.
   */
  it('should set css class to input', () => {
    component.searchInputClass = 'input-class';
    fixture.detectChanges();

    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.classList).toContain('input-class');
  });

  /**
   * Used External Control.
   */
  it('should get empty template', () => {
    component.usedExternalControl = true;
    fixture.detectChanges();

    const template = fixture.debugElement.children;
    expect(template.length).toBe(0);
  });

  /**
   * Check subscription on new search.
   */
  it('should emit new search string from outer control', (done) => {
    component.usedExternalControl = true;
    fixture.detectChanges();
    component.searchRequest.subscribe((value) => {
      expect(value).toBe('test');
      done();
    });
    component.dataFromExternalControl = 'test';
  });

  it('should emit new search string from inner control', fakeAsync(() => {
    component.searchRequest.subscribe((value) => {
      expect(value).toBe('test');
    });

    fixture.detectChanges();
    const input = fixture.debugElement.nativeElement.querySelector('input');
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    tick(500);
  }));

  it('should skip first empty string.', fakeAsync(() => {
    component.searchRequest.subscribe((value) => {
      expect(value).toBe('test');
    });

    fixture.detectChanges();
    const input = fixture.debugElement.nativeElement.querySelector('input');
    input.value = '';
    input.dispatchEvent(new Event('input'));
    tick(500);
    fixture.detectChanges();
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    tick(500);
  }));

  it('should skip first empty string, but next empty strings are emits.', fakeAsync(() => {
    component.searchRequest.pipe(
      skip(1)
    ).subscribe((value) => {
      expect(value).toBe('');
    });

    fixture.detectChanges();
    const input = fixture.debugElement.nativeElement.querySelector('input');
    input.value = '';
    input.dispatchEvent(new Event('input'));
    tick(500);
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    tick(500);
    fixture.detectChanges();
    input.value = '';
    input.dispatchEvent(new Event('input'));
    tick(500);
  }));
});
