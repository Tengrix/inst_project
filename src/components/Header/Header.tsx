import React, { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';
import styles from './styles.module.css';
import { LangSwitcher } from '../langSwitcher/LangSwitcher';

export type HeaderProps<T extends ElementType = 'header'> = {
  title?: string,
  children?: ReactNode,
  icon?: ReactNode,
  LanguageSwitcher?: ElementType,
} & ComponentPropsWithoutRef<T>

const Header = <T extends ElementType = 'header'>(
  props: HeaderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof HeaderProps<T>>
) => {
  const {
    title='Inctagram',
    children,
    icon = <img src={"/assets/notification.png"} alt="notification" />,
    LanguageSwitcher = LangSwitcher,
    ...rest
  } = props;

  return (
    <header className={styles.header} {...rest}>
      <div className={styles.text}>
        <h1 className={styles.inctagramTitle}> {title} </h1>
      </div>
      <div className={styles.languageSelector}>
        <div className={styles.notificationIcon}>
          {icon}
        </div>
        {children ? children : <LanguageSwitcher />}
      </div>
    </header>
  );
};

export default Header;
