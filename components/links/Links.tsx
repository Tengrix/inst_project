import style from './Links.module.css';

export const Links = () => {
    return (
        <div className={style.links}>
            <img src="/assets/google.png" alt="Sign up with google" width={36} height={36} />
            <img src="/assets/gitHub.png" alt="Sign up with gitHub" width={36} height={36} />
        </div>
    );
};
