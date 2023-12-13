import { useTranslations } from 'next-intl';
import React, { ReactNode } from 'react';

import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal/Modal';

import s from './ActionWithUserModal.module.scss';

type Props = {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    id: string;
    modalHandler: (open: boolean) => void;
    modalTitle?: string;
    children: ReactNode;
};

const ActionWithUserModal = ({ id, modalHandler, modalTitle, children, ...props }: Props) => {
    const t = useTranslations('button');

    return (
        <Modal
            className={s.container}
            title={modalTitle}
            open={props.open}
            customButtonsBlock={
                <>
                    {id === 'REMOVE_USER' ? (
                        <>
                            <Button
                                onClick={() => {
                                    alert('DELETE CANCEL');
                                }}>
                                {t('no')}
                            </Button>
                            <Button
                                onClick={() => {
                                    alert(' DELETE USER FUNCTION');
                                }}>
                                {t('yes')}
                            </Button>
                        </>
                    ) : (
                        <>
                            <>
                                <Button
                                    onClick={() => {
                                        alert(' BAN CANCEL');
                                    }}>
                                    {t('no')}
                                </Button>
                                <Button
                                    onClick={() => {
                                        alert(' BAN USER FUNCTION');
                                    }}>
                                    {t('yes')}
                                </Button>
                            </>
                        </>
                    )}
                </>
            }
            modalHandler={modalHandler}>
            {children}
        </Modal>
    );
};

export default ActionWithUserModal;
