import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import React, { ReactNode } from 'react';

import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal/Modal';

import s from './ActionWithUserModal.module.scss';

type Props = {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    modalHandler: (isOpen: boolean) => void;
    modalTitle?: string;
    children: ReactNode;
    // children: ReactNode
};

const ActionWithUserModal = ({ modalHandler, modalTitle, children, ...props }: Props) => {
    return (
        <Modal
            className={s.container}
            title={modalTitle}
            open={props.open}
            customButtonsBlock={
                <>
                    <Button
                        onClick={() => {
                            alert('NO');
                        }}>
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            alert('YES');
                        }}>
                        Yes
                    </Button>
                </>
            }
            modalHandler={modalHandler}>
            {modalTitle}
        </Modal>
    );
};

export default ActionWithUserModal;
