import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);

  const handleLangChange = (newLang: string) => {
    i18n.changeLanguage(newLang);
    setShowLanguages(false);
  };

  const getCurrentFlag = () => {
    switch(i18n.language) {
      case 'english':
        return "/assets/eng.png";
      case 'russian':
        return "/assets/ru.png";
      default:
        return "/assets/eng.png"; 
    }
  }

  const getCurrentLanguage = () => {
    let lang = '';
    switch(i18n.language) {
      case 'english':
        lang = t('english');
        break;
      case 'russian':
        lang = t('russian');
        break;
      default:
        lang = t('english');
        break;
    }
    return lang.charAt(0).toUpperCase() + lang.slice(1);
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
          <li className={styles.languageItem} onClick={() => handleLangChange('english')}>
            <img src="/assets/eng.png" alt="English" className={styles.languageFlag}/> 
            English
          </li>
          <li className={styles.languageItem} onClick={() => handleLangChange('russian')}>
            <img src="/assets/ru.png" alt="Russian" className={styles.languageFlag}/> 
            Русский
          </li>
        </ul>
        <button className={styles.languageButton} onClick={() => setShowLanguages(!showLanguages)}>
          <img src={getCurrentFlag()} alt="Current Language" className={styles.languageFlag}/>
          <span>{getCurrentLanguage()}</span>
          <FontAwesomeIcon icon={faChevronDown} className={`${showLanguages ? styles.arrowUp : styles.arrowDown}`} />
        </button>
      </div>
    </header>
  );
};

export default Header;
