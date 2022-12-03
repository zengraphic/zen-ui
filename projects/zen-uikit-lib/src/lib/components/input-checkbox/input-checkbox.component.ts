import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, Injector, Output, Input, EventEmitter, AfterViewInit, forwardRef } from '@angular/core';
import { InputBaseComponent } from '../input-base/input-base.component';

const HOST_ATTRIBUTES_CLASS: any = {
  'zen-small': 'zen-input-checkbox--small',
  'zen-switch': 'zen-input-checkbox--switch'
};
const HOST_ATTRIBUTES: string[] = [
  'zen-small',
  'zen-switch'
];

@Component({
  selector: 'zen-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputCheckboxComponent),
    multi: true
  }]
})
export class InputCheckboxComponent extends InputBaseComponent implements ControlValueAccessor, AfterViewInit {

  private innerValue: boolean;
  onTouched: (val: any) => void;
  onChange: (val: any) => void;

  @Output() clicked = new EventEmitter();

  /**
   * isHTML says that the component will render html elements in content
   */
  @Input() isHTML: boolean;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    for (const attr of HOST_ATTRIBUTES) {
      if (this.hasHostAttributes(attr)) {
        const classFromAttribute = InputCheckboxComponent.getClassFromHostAttribute(attr);
        this.additionalClasses = [...this.additionalClasses, classFromAttribute];
      }
    }
  }

  /**
  * set the class defined in HOST_ATTRIBUTES_CLASS
  * const HOST_ATTRIBUTES_CLASS: any = {
    'zen-small': 'zen-input-checkbox--small',
    'zen-switch': 'zen-input-checkbox--switch'
    };
  */
  private static getClassFromHostAttribute(hostAttribute: string) {
    return HOST_ATTRIBUTES_CLASS[hostAttribute] || 'zen-input-checkbox--default';
  }

  private get hostElement() {
    return this.elementRef?.nativeElement;
  }

/**
 * Detects if component has host attributes to set the variatons
 * 
    const HOST_ATTRIBUTES: string[] = [
    'zen-small',
    'zen-switch'
    ];
 */
private hasHostAttributes(...attributes: string[]) {
    return attributes.some(attribute => this.hostElement.hasAttribute(attribute));
  }

  get value(): any {
    return this.innerValue;
  }

  set value(obj: any) {
    if (obj !== this.innerValue) {
      this.innerValue = obj;
      this.onChange(obj);
      this.onTouched(obj);
    }
  }

  writeValue(obj: any): void {
    if (obj !== this.innerValue) {
      this.innerValue = obj;
      this.ref?.markForCheck();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onClick(value: any) {
    this.clicked.emit(value);
    this.hostElement.blur();
  }

}
