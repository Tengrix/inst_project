'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Logo from '@/components/Logo';
import '@/assets/scss/pages/_home.scss';


export default function HomePage() {
    const t = useTranslations('commons');

    return (
        <main className='main'>
            <section className='home'>
                <div className='home__container-fluid'>
                    <div className='home__logo'><Logo /></div>
                    <ul className="home__menu menu">
                        <li className="home__item menu__item"><Link className="home__link menu__link" href="/sign-in">{t('sign_in')}</Link></li>
                        <li className="home__item menu__item"><Link className="home__link menu__link" href="/sign-up">{t('sign_up')}</Link></li>
                        <li className="home__item menu__item"><Link className="home__link menu__link" href="/password-reset">{t('reset_password')}</Link></li>
                    </ul>
                </div>
            </section>
        </main>
    )
}
