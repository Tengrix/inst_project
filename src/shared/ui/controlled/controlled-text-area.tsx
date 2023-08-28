import { useTranslations } from 'next-intl';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

import { TextArea, TextAreaFieldProps } from '../text-area';

export type ControlledTextAreaFieldProps<TFieldValues extends FieldValues> = {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
    translation?: string;
} & Omit<TextAreaFieldProps, 'onChange' | 'value' | 'id'>;

export const ControlledTextAreaField = <TFieldValues extends FieldValues>(
    props: ControlledTextAreaFieldProps<TFieldValues>
) => {
    const {
        field,
        fieldState: { error }
    } = useController({
        name: props.name,
        control: props.control
    });

    const { translation } = props;
    const t = useTranslations(translation);
    const errorMessage = translation && error?.message ? t(error.message) : error?.message;

    return <TextArea {...props} {...field} errorMessage={errorMessage} />;
};
