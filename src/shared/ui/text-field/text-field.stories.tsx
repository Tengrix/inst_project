import type { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, useState } from 'react';

import { TextField } from './';

const meta = {
    title: 'Components/TextField',
    component: TextField,
    tags: ['autodocs'],
    argTypes: {
        type: {
            options: ['search', 'password', 'text']
        }
    }
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof TextField>;

export const Primary: Story = {
    args: {
        type: 'text',
        placeholder: 'placeholder'
    }
};
export const Invalid: Story = {
    args: {
        type: 'text',

        errorMessage: 'error',
        value: 'error'
    }
};

const Template = (args: { type: 'text'; errorMessage: 'error'; value: 'error' }) => {
    const [value, setValue] = useState<string>('');
    const handler = (value: ChangeEvent<HTMLInputElement>) => {
        setValue(value.target.value);
    };

    return (
        <>
            <TextField
                {...args}
                type={'search'}
                value={value}
                onChange={e => handler(e)}
                onClearValue={() => setValue('')}
            />
        </>
    );
};

export const Search = Template;

export const Password: Story = {
    args: {
        type: 'password'
    }
};
export const Disabled: Story = {
    args: {
        type: 'text',

        disabled: true
    }
};
