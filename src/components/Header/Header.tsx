import React, {ReactNode} from 'react';
import styles from './styles.module.css';
import LangSwitcher from "@/components/langSwitcher/LangSwitcher";
// import Image from "next/image";
import { BellIcon } from '@radix-ui/react-icons'

export type HeaderProps = {
  title?: string,
  children?: ReactNode,
  icon?: ReactNode,
}

const Header = (props: HeaderProps) => {
  const {
    title='Inctagram',
    children,
    icon = <BellIcon height={24} width={24}/>,
  } = props;

  return (

    <div className={styles.header}>
        <div className={styles.text}>
            <h1 className={styles.inctagramTitle}> {title} </h1>
        </div>
        <div className={styles.languageSelector}>
            {children}
            <div className={styles.notificationIcon}>
                {icon}
            </div>
          <LangSwitcher/>
        </div>

    </div>
  );
};

export default Header;
