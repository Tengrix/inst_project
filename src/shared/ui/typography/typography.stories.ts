import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
           'large',
           'h1',
           'h2',
           'h3',
           'bold16',
           'regular16',
           'bold14',
           'medium14',
           'regular14',
           'bold-small',
           'small',
           'link-small',
           'regular-link',
           'error',
      ],
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'large text example',
  },
}

export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'h1 text example',
  },
}
export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'h2 text example',
  },
}
export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'h3 text example',
  },
}

export const Body1: Story = {
  args: {
    variant: 'bold16',
    children: 'bold16 text example',
  },
}
export const Body2: Story = {
  args: {
    variant: 'regular16',
    children: 'regular16 text example',
  },
}
export const Subtitle1: Story = {
  args: {
    variant: 'bold14',
    children: 'bold14 text example',
  },
}
export const Subtitle2: Story = {
  args: {
    variant: 'medium14',
    children: 'medium14 text example',
  },
}
export const Caption: Story = {
  args: {
    variant: 'regular14',
    children: 'regular14 text example',
  },
}
export const Overline: Story = {
  args: {
    variant: 'bold-small',
    children: 'bold-small text example',
  },
}
export const Link1: Story = {
  args: {
    variant: 'link-small',
    children: 'link-small text example',
    color: 'link',
  },
}
export const Link2: Story = {
  args: {
    variant: 'regular-link',
    children: 'regular-link text example',
    color: 'link',
  },
}
