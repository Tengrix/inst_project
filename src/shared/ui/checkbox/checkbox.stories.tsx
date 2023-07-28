import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      options: [true, false],
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: args => {
    const [checked, setChecked] = useState(false)

    return (
      <>
        <Checkbox
          {...args}
          label={'Check-box'}
          disabled={false}
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div>Checked: {checked ? 'true' : 'false'}</div>
      </>
    )
  },
}
export const Checked: Story = {
  args: { disabled: false, checked: true },
}
export const NotChecked: Story = {
  args: { disabled: false, checked: false },
}
export const DisabledAndChecked: Story = {
  args: { disabled: true, checked: true },
}

export const DisabledAndNotChecked: Story = {
  args: { disabled: true, checked: false },
}
