import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import { useSignUpConfirmationMutation } from '@/redux/store/Auth/authApiSlice';

const EmailLinkValidationWrapper = () => {
    const router = useRouter();
    const params = useSearchParams();

    const code = params.get('code') as string;
    const email = params.get('email');

    const [confirmEmail] = useSignUpConfirmationMutation();

    useEffect(() => {
        email &&
            confirmEmail({ code })
                .unwrap()
                .then(() => {
                    router.push('/sign-up/email-confirmed');
                })
                .catch(e => {
                    console.log(email);
                    router.push(`/sign-up/email-verification-link-expired?email=${email}`);
                });
    }, [code, email]);

    return <></>;
};

EmailLinkValidationWrapper.getLayout = getLayout;
export default EmailLinkValidationWrapper;
