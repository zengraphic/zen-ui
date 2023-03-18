import { FormControl, FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextComponent } from './input-text.component';
import { By } from '@angular/platform-browser';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async () => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
      control = new FormControl();
      viewToModelUpdate() {}
  }};
   await TestBed.configureTestingModule({
      declarations: [ InputTextComponent ],
      imports: [FormsModule,ReactiveFormsModule]
    })
    .overrideComponent(InputTextComponent,{
      add: {
        providers: [NG_CONTROL_PROVIDER]
      }
    }).compileComponents();
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have default type as text', () => {
    expect(component.type).toEqual('text');
  });
  it('should have type as number', () => {
    expect(component.type).toEqual('text');
    component.type = 'number';
    expect(component.type).toEqual('number');
  });
  it('should have 1 additionalClass', () => {
    component.additionalClasses = ['pippo'];
    expect(component.additionalClasses.length).toEqual(1);
  });
  it('should not show preview element', () => {
    component.showPreview = false;
    const previewTrigger = fixture.debugElement.query(By.css('.zen-input-text__preview'));
    expect(previewTrigger).toBeFalsy();
  });
  it('should show preview element', () => {
    component.showPreview = true;
    fixture.detectChanges();
    const previewTrigger = fixture.debugElement.query(By.css('.zen-input-text__preview'));
    expect(previewTrigger).toBeTruthy();
  });
  it('should show preview', () => {
    component.type = 'password';
    component.showPreview = true;
    fixture.detectChanges();
    const previewTrigger = fixture.debugElement.query(By.css('.zen-input-text__preview'));
    previewTrigger.nativeElement.click();
    fixture.detectChanges();
    expect(component.type).toEqual('text');
    
  });
  it('should show error', () => {
    component.formControl?.setErrors({required:true})
    expect(component.formControl?.valid).toBeFalse();
  });
});
