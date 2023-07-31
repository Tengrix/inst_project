import style from './SelectLanguages.module.css';

export const SelectLanguages = () => {
    return (
        <div className={style.selectLanguages}>
            <select className={style.selectLanguages}>
                <option value="Russian">Russian</option>
                <option value="English">English</option>
            </select>
        </div>
    );
};
