import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './register-form.module.scss'

import { registerSchema } from '@/features/registration/register-schema'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ControlledTextField } from '@/shared/ui/controlled'
import { Typography } from '@/shared/ui/typography'

export type RegisterFormType = z.infer<typeof registerSchema>

type RegisterFormPropsType = {
  linkPath: string
  onSubmitHandler: (data: RegisterFormType) => void
}

export const RegisterForm = (props: RegisterFormPropsType) => {
  const { linkPath, onSubmitHandler } = props

  const { control, handleSubmit } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
    onSubmitHandler(data)
  })

  return (
    <Card className={s.card}>
      <Typography variant={'large'}>Sign Up</Typography>
      <form onSubmit={onSubmit}>
        <ControlledTextField
          control={control}
          name={'username'}
          label={'Username'}
          className={s.email}
        />
        <ControlledTextField control={control} name={'email'} label={'Email'} className={s.email} />
        <ControlledTextField
          control={control}
          name={'password'}
          type={'password'}
          label={'Password'}
          className={s.password}
        />
        <ControlledTextField
          control={control}
          name={'confirmPassword'}
          type={'password'}
          label={'Confirm password'}
          className={s.confirmPassword}
        />
        <Button type={'submit'} fullWidth className={s.registerBtn}>
          Sign Up
        </Button>
      </form>
      <Typography variant={'body2'} className={s.subtitle}>
        Already have an account?
      </Typography>
      <Button as={'a'} variant={'link'} className={s.link} href={linkPath}>
        Sign In
      </Button>
    </Card>
  )
}
