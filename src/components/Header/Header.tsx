import React, {ReactNode} from 'react';
import styles from './styles.module.css';
import LangSwitcher from "@/components/langSwitcher/LangSwitcher";

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
