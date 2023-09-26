import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

import { TextField } from '@/shared/ui/text-field';
import { Typography } from '@/shared/ui/typography';

type Props<TFieldValues extends FieldValues> = {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
    label: string;
};
const NewDatePicker = <TFieldValues extends FieldValues>(props: Props<TFieldValues>) => {
    const { field } = useController({
        name: props.name,
        control: props.control
    });
    return (
        <div>
            <Typography variant={'regular14'} color={'form'}>
                {props.label}
            </Typography>
            <DatePicker
                selected={field.value}
                onChange={(date: any) => field.onChange(date)}
                customInput={<TextField value={field.value} readOnly={true} />}
            />
        </div>
    );
};

export default NewDatePicker;
