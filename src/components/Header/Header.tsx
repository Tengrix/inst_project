import { useState } from 'react';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const [showLanguages, setShowLanguages] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({lang: 'English', flag: '/assets/eng.png'});

  const selectLanguage = (lang: string, flag: string) => {
    setCurrentLanguage({lang, flag});
    setShowLanguages(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.text}>
        <h1>Inctagram</h1>
      </div>
      <div className={styles.languageSelector}>
        <div className={styles.notificationIcon}>
          <FontAwesomeIcon icon={faBell} />
        </div>
        <ul className={`${styles.languageList} ${showLanguages ? styles.active : ''}`}>
          <li className={styles.languageItem} onClick={() => selectLanguage('English', '/assets/eng.png')}>
            <img src="/assets/eng.png" alt="English" className={styles.languageFlag}/> 
            English
          </li>
          <li className={styles.languageItem} onClick={() => selectLanguage('Русский', '/assets/ru.png')}>
            <img src="/assets/ru.png" alt="Russian" className={styles.languageFlag}/> 
            Русский
          </li>
        </ul>
        <button className={styles.languageButton} onClick={() => setShowLanguages(!showLanguages)}>
          <img src={currentLanguage.flag} alt="Current Language" className={styles.languageFlag}/>
          <span>{currentLanguage.lang}</span>
          <div className={`${showLanguages ? styles.arrowUp : styles.arrowDown}`}></div>
        </button>
      </div>
    </header>
  );
};

export default Header;

