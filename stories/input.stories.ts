import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { InputTextComponent, ZenUikitLibModule } from 'zen-uikit-lib';

export default {
  title: 'Zen/Input',
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

export const Disabled = Template.bind({});

Default.args = {} as Partial<InputTextComponent>;

Disabled.args = {
  disabled: true
} as Partial<InputTextComponent>;