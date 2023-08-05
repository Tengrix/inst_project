import React, {ReactNode} from 'react';
import styles from './styles.module.css';
import LangSwitcher from "@/components/langSwitcher/LangSwitcher";
import Image from "next/image";

export type HeaderProps = {
  title?: string,
  children?: ReactNode,
  icon?: ReactNode,
}

const Header = (props: HeaderProps) => {
  const {
    title='Inctagram',
    children,
    icon = <Image src={"/assets/notification.png"} alt="notification" width={18} height={20}/>,
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
