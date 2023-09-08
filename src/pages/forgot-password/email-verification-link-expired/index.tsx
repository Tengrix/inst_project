import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal/Modal';
import img from 'public/assets/expiredLink.png';
import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';

import s from './index.module.scss';

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../../messages/${locale}/auth.json`)).default
        }
    };
}

const EmailVerificationLinkExpired = () => {
    // const [forgotPassword] = usePasswordRecoveryMutation();
    const t = useTranslations('auth');
    const resendHandler = () => {
        // forgotPassword({email: ''})
    };

    return (
        <div className={s.container}>
            <h2>{t('verificationPage.linkExpiredTitle')}</h2>
            <div className={s.body}>{t('verificationPage.verificationText')}</div>
            <div>
                <Modal
                    modalTrigger={
                        <Button variant="primary" onClick={resendHandler}>
                            {t('button.resendVerificationLink')}
                        </Button>
                    }
                    title={t('modal.modalTitle')}>
                    {t('modal.modalVerificationText')}
                </Modal>
            </div>
            <Image src={img.src} alt="" width={473} height={352} />
        </div>
    );
};

EmailVerificationLinkExpired.getLayout = getLayout;
export default EmailVerificationLinkExpired;
