import React, { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';
import styles from './styles.module.css';
import { LangSwitcher } from '../langSwitcher/LangSwitcher';

export type HeaderProps = {
  title?: string,
  children?: ReactNode,
  icon?: ReactNode,
}

const Header = (props: HeaderProps) => {
  const {
    title='Inctagram',
    children,
    icon = <img src={"/assets/notification.png"} alt="notification" />,
  } = props;

  return (
    <header className={styles.header}}>
      <div className={styles.text}>
        <h1 className={styles.inctagramTitle}> {title} </h1>
      </div>
      <div className={styles.languageSelector}>
        <div className={styles.notificationIcon}>
          {icon}
        </div>
        {children&&children}
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
