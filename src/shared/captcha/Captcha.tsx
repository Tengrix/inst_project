import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import s from './Captcha.module.scss';

export const Captcha = () => {
  const [captchIsDone, setCaptchaIsDone] = useState(false);
  const key = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
  const onChange = () => {
    setCaptchaIsDone(true);
  };
  return (
    <div className={s.captcha}>
      <ReCAPTCHA sitekey={key} onChange={onChange} />
    </div>
  );
};
