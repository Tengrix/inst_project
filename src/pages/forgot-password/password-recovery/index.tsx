import { useRouter } from 'next/router';

const LinkVerification = () => {
    const router = useRouter();
    console.log(router.query);
    router.push('/forgot-password/create-new-password' + `${router.query}`);
    //здесь должна происходить проверка ссылки и редирект на смену пароля либо на повторную отправка ссылки
    return <div></div>;
};

export default LinkVerification;
