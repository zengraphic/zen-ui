import { ZenUikitLibModule, InputTextComponent } from 'zen-uikit-lib';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

export default {
  title: 'Zen-uikit-lib/Input/Text',
  component: InputTextComponent,
  decorators: [
    moduleMetadata({
      imports: [ZenUikitLibModule],
    }),
  ],
} as Meta;

const Template: Story<InputTextComponent> = (args: InputTextComponent) => ({
  props: args,
});

export const Default = Template.bind({});

Default.args = {
  placeholder: 'placeholder',
  label: 'input'
} as Partial<InputTextComponent>;

export const Disabled = Template.bind({});

Disabled.args = {
  placeholder: 'placeholder',
  label: 'input',
  disabled: true
} as Partial<InputTextComponent>;

export const Error = Template.bind({});
Error.args = {
  placeholder: 'placeholder',
  label: 'input',
  disabled: false,
  errorMessage: 'error',
  innerValue:'pippo',
  additionalClasses: ['error']
} as Partial<InputTextComponent>;