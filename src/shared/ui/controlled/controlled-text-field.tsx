import {Control, FieldPath, FieldValues, useController} from 'react-hook-form'
import {TextField, TextFieldProps} from "@/shared/ui/text-field";


export type ControlledTextFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
  translation?: (error: string) => string
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
  const errorMessage = translation && error?.message ? translation(error.message) : error?.message;

  return <TextField {...props} {...field} errorMessage={errorMessage}/>
}
