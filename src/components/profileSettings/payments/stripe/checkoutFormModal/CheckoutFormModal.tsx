import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal/Modal';

type CheckoutFormModalType = {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    success: boolean | undefined;
};

export const CheckoutFormModal = ({ isModalOpen, setIsModalOpen, success }: CheckoutFormModalType) => {
    const router = useRouter();
    const t = useTranslations();

    const clearQueryString = () => {
        setIsModalOpen(false);
        /* activateAccountTab(); */
        router.push(router.pathname);
    };

    return (
        <Modal
            open={isModalOpen}
            modalHandler={clearQueryString}
            customButtonsBlock={
                success ? (
                    <Button variant="primary" onClick={() => {}}>
                        {t('button.ok')}
                    </Button>
                ) : (
                    <Button variant="primary" onClick={() => {}}>
                        {t('button.backToPayment')}
                    </Button>
                )
            }
            title={success ? t('modal.successTransactionModalTitle') : t('modal.errorTransactionModalTitle')}>
            {success ? t('modal.successTransactionModalDescription') : t('modal.errorTransactionModalDescription')}
        </Modal>
    );
};
