import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useSignUpConfirmationMutation } from '@/api/authApiSlice';
import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout';

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
                .catch(() => {
                    router.push(`/sign-up/email-verification-link-expired?email=${email}`);
                });
    }, [code, email]);

    return <></>;
};

EmailLinkValidationWrapper.getLayout = getLayout;
export default EmailLinkValidationWrapper;
