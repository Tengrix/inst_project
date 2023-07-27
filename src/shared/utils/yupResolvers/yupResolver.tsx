import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email: yup.string().email('Enter valid email address').required('This field is required'),
    password: yup.string().required('This field is required')
})
export const signUpSchema = yup.object().shape({
    userName: yup.string().required('This field is required').min(6, 'Username must have at least 6 characters').max(30,'Username cannot be longer than 20 characters '),
    email: yup.string().email('Enter valid email address').required('This field is required'),
    password: yup.string().required('This field is required').min(6, 'Password must have at least 6 characters').max(20,'Password cannot be longer than 20 characters '),
    passwordConfirmation: yup.string().required('This field is required').oneOf([yup.ref('password')], 'Your passwords do not match')
})
export const recoveryPassSchema = yup.object().shape({
    password: yup.string().required('This field is required').min(6, 'Password must have at least 6 characters'),
    passwordConfirmation: yup.string().required('This field is required').oneOf([yup.ref('password')], 'Your passwords do not match')
})

