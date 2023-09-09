import { useTranslations } from 'next-intl';
import React, { ReactNode } from 'react';

import { Modal } from '@/shared/ui/modal/Modal';

type Props = {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    modalHandler: (isOpen: boolean) => void;
    children: ReactNode;
    customButtonsBlock: ReactNode;
};
const ConfirmCloseModal = (props: Props) => {
    const t = useTranslations('');

    return (
        <Modal
            title={t('modal.closeModalTitle')}
            open={props.open}
            modalHandler={props.modalHandler}
            customButtonsBlock={props.customButtonsBlock}>
            {props.children}
        </Modal>
    );
};

export default ConfirmCloseModal;
