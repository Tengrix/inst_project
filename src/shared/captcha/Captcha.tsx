import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import s from './Captcha.module.scss';

export const Captcha = () => {
  const [captchIsDone, setCaptchaIsDone] = useState(false);
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY as string;

  const onChange = () => {
    setCaptchaIsDone(true);
  };

  return (
    <div className={s.captcha}>
      <ReCAPTCHA theme={'dark'} sitekey={key} onChange={onChange} />
    </div>
  );
};
