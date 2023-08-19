import {Control, FieldPath, FieldValues, useController} from 'react-hook-form'
import {TextField, TextFieldProps} from "@/shared/ui/text-field";
import { useTranslations } from 'next-intl';


export type ControlledTextFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
  translation?: string
} & Omit<TextFieldProps, 'onChange' | 'value' | 'id'>

export const ControlledTextField = <TFieldValues  extends FieldValues>(props: ControlledTextFieldProps<TFieldValues>) => {
  const {
    field,
    fieldState: {error},
  } = useController({
    name: props.name,
    control: props.control,
  })

  const { translation } = props;
  const t = useTranslations(translation);
  const errorMessage = translation && error?.message ? t(error.message) : error?.message;

  return <TextField {...props} {...field} errorMessage={errorMessage}/>
}
