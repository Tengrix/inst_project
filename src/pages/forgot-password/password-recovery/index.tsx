import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LinkVerification = () => {
    const { push, pathname, query, isReady } = useRouter();
    useEffect(() => {
        if (isReady) {
            push({ pathname: '/forgot-password/create-new-password', query });
        }
    }, [isReady]);
    //здесь должна происходить проверка ссылки и редирект на смену пароля либо на повторную отправка ссылки
    return <div></div>;
};

export default LinkVerification;
