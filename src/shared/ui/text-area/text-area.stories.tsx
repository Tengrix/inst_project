import { ChangeEvent, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from '.';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Primary: Story = {
  args: {},
};
export const Invalid: Story = {
  args: {
    errorMessage: 'Error text',
    value: 'Please, fix style .error in typography.module.scss, ',
  },
};
export const Focus: Story = {
  args: {
    autofocus: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
