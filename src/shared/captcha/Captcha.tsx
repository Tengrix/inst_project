import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import s from './Captcha.module.scss';

type CaptchaPropsType = {
  changeCaptchaValue: (captchIsDone: boolean) => void;
  setCaptchaValue: (value:string)=>void
};

export const Captcha = ({ changeCaptchaValue,setCaptchaValue }: CaptchaPropsType) => {
  const [captchIsDone, setCaptchaIsDone] = useState(false);
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY as string;

  const onChange = (value:string|null) => {
    value&&setCaptchaValue(value)
    setCaptchaIsDone(true);
    changeCaptchaValue(captchIsDone);
  };

  return (
    <div className={s.captcha}>
      <ReCAPTCHA theme={'dark'} sitekey={key} onChange={onChange} />
    </div>
  );
};
