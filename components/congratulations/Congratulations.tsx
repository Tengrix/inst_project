import style from './Congratulations.module.css';
export const Congratulations = () => {
    return (
        <div className={style.congratlationsBlock}>
            <h1 className={style.congratulationsText} style={{ marginTop: '30px' }}>
                Congratulation
            </h1>
            <p className={style.congratulationsDescription} style={{ marginTop: '30px' }}>
                Your email has been confirmed
            </p>
            <button
                className={style.congratulationsButton}
                style={{ marginTop: '80px' }} /* onClick={changeFirstClientStatus} */
            >
                Sign In
            </button>
            <img
                src={'/assets/congratulations.png'}
                width={432}
                height={300}
                style={{ marginTop: '80px' }}
            />
        </div>
    );
};
