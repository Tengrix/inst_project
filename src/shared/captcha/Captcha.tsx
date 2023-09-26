import { ReCAPTCHA } from 'react-google-recaptcha';

import s from './Captcha.module.scss';

type CaptchaPropsType = {
    // eslint-disable-next-line no-unused-vars
    setCaptchaValue: (value: string) => void;
};

export const Captcha = ({ setCaptchaValue }: CaptchaPropsType) => {
    const key = process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY as string;
    const onChange = (value: string | null) => {
        value && setCaptchaValue(value);
    };

    const ReCaptchaComponent = ReCAPTCHA as any;

    return (
        <div className={s.captcha}>
            <ReCaptchaComponent theme={'dark'} sitekey={key} onChange={onChange} />
        </div>
    );
};
