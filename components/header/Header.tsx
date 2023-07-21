import Image from 'next/image';
import style from './Header.module.css';
import { Logo } from '../logo/Logo';
import { SelectLanguages } from '../selectLanguage/SelectLanguage';

export const Header = () => {
    return (
        <div className={style.header}>
            <div className={style.headerLeftSide}>
                <Logo />
            </div>
            <div className={style.headerRightSide}>
                <div className={style.notifications}>
                    <img src="/assets/notification.png" alt="Notification Button" />
                </div>
                <SelectLanguages />
            </div>
        </div>
    );
};
