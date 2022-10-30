import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, forwardRef, Injector, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBaseComponent } from '../input-base/input-base.component';

@Component({
  selector: 'zen-input-text',
  templateUrl: './input-text.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTextComponent),
    multi: true
  }]
})
export class InputTextComponent extends InputBaseComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() disabled: boolean = false;
  @Input() placeholder: boolean = false;
  @Input() type = 'text';
  @Input() additionalClass: string[] = [];

  @ViewChild('inputText', {static: true}) inputElement?: ElementRef;

  inferredType = 'text';
  onTouched!: (val: any) => void;
  private innerValue: string = '';
  private cleave: any;
  private onChange!: (val: any) => void;

  constructor(injector: Injector) {
    super(injector);
  }

  get value(): any {
    return this.innerValue;
  }

  get isFilled(): boolean {
    return Boolean(this.innerValue || this.placeholder);
  }

  set value(obj: any) {
    if (obj !== this.innerValue) {
      this.innerValue = this.sanitizeValue(obj);
      this.onChange(this.innerValue);
      this.onTouched(this.innerValue);
    }
  }

  private sanitizeValue(obj: any) {
    if (!this.cleave) {
      return obj;
    }

    switch (this.type) {
      case 'numeric':
        return (this.cleave.getRawValue() || '').replace(/[^0-9]/, '');
      default: {
        return this.cleave.getRawValue();
      }
    }
  }
  
  writeValue(obj: any): void {
    this.innerValue = obj;
    this.ref?.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    switch (this.type) {
      case 'email': {
        this.inferredType = 'email';
        break;
      }
      case 'password': {
        this.inferredType = 'password';
        break;
      }
      case 'hidden': {
        this.inferredType = 'hidden';
        break;
      }
      default: {
        // Ignore
      }
    }
  }

}
