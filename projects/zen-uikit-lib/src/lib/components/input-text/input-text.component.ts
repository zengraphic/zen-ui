import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, Injector, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBaseComponent } from '../input-base/input-base.component';

const BUTTON_HOST_ATTRIBUTES_CLASS: any = {
  'zen-small': 'zen-input--small',
  'zen-medium': 'zen-input--medium'
};
const BUTTON_HOST_ATTRIBUTES: string[] = [
  'zen-small',
  'zen-medium'
];
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
  @Input() placeholder: string = '';
  @Input() type = 'text';
  @Input() showPreview: boolean = false;

  onTouched!: (val: any) => void;
  private innerValue: string = '';
  private onChange!: (val: any) => void;

  constructor(injector: Injector) {
    super(injector);
  }

  private static getClassFromHostAttribute(hostAttribute: string): string {
    return BUTTON_HOST_ATTRIBUTES_CLASS[hostAttribute] || '';
  }

  private get hostElement() {
    return this.elementRef.nativeElement;
  }

  private hasHostAttributes(...attributes: string[]): boolean {
    return attributes.some(attribute => this.hostElement.hasAttribute(attribute));
  }

  get value(): any {
    return this.innerValue;
  }

  get isFilled(): boolean {
    return Boolean(this.innerValue || this.placeholder);
  }
  set value(obj: any) {
    if (obj !== this.innerValue) {
      this.innerValue = obj;
      this.onChange(this.innerValue);
      this.onTouched(this.innerValue);
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
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this.hasHostAttributes(attr)) {
        const classFromAttribute = InputTextComponent.getClassFromHostAttribute(attr);
        this.additionalClasses = [...this.additionalClasses, classFromAttribute ];
      }
    }
  }

  togglePreview() {
    this.type = this.type === 'password' ? 'text' : 'password' ;
    // TOdO: add style for preview icon
  }

}
