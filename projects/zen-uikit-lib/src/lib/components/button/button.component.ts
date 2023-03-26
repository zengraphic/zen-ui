import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  ElementRef,
} from '@angular/core';

const BUTTON_HOST_ATTRIBUTES_CLASS: any = {
  'zen-primary': 'zen-button--primary',
  'zen-accent': 'zen-button--accent',
  'zen-default': 'zen-button--default',
  'zen-big': 'zen-button--big',
  'zen-ghost': 'zen-button--ghost',
  'zen-round': 'zen-button--round',
};
const BUTTON_HOST_ATTRIBUTES: string[] = [
  'zen-primary',
  'zen-accent',
  'zen-default',
  'zen-big',
  'zen-ghost',
  'zen-round',
];

@Component({
  selector: 'zen-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input() type = 'button';
  @Input() label: string = '';
  @Input() iconPath: string = '';
  @Input() withIcon: boolean = false;
  @Input() disabled: boolean;
  @Input() cssClasses: string[];

  additionalClasses: string[] = [];

  constructor(private elementRef: ElementRef) {}

  get inferredClasses(): string {
    return this.additionalClasses.join(' ');
  }

  private static getClassFromHostAttribute(hostAttribute: string): string {
    return BUTTON_HOST_ATTRIBUTES_CLASS[hostAttribute] || 'zen-button--default';
  }

  private get hostElement() {
    return this.elementRef.nativeElement;
  }

  private hasHostAttributes(...attributes: string[]) {
    return attributes.some((attribute) =>
      this.hostElement.hasAttribute(attribute)
    );
  }

  ngOnInit(): void {
    this.additionalClasses = this.cssClasses || [];

    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this.hasHostAttributes(attr)) {
        const classFromAttribute =
          ButtonComponent.getClassFromHostAttribute(attr);
        this.additionalClasses = [
          ...this.additionalClasses,
          classFromAttribute,
        ];
      }
    }
  }
}
