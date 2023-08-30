import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import img from 'public/assets/congratulations.png';
import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';

import s from './index.module.scss';

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../../messages/${locale}/auth.json`)).default
        }
    };
}

const EmailConfirmed = () => {
    const t = useTranslations('auth');

    return (
        <div className={s.container}>
            <h2>{t('congratulationPage.h1')}</h2>
            <div> {t('congratulationPage.congratulationText')}</div>
            <Link href={'/sign-in'}>
                <Button variant={'primary'}>{t('button.signInButton')}</Button>
            </Link>
            <Image src={img.src} alt="" width={432} height={300} />
        </div>
    );
};

EmailConfirmed.getLayout = getLayout;
export default EmailConfirmed;
