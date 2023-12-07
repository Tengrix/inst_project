import React, { ReactNode, useState } from 'react';

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
                                No
                            </Button>
                            <Button
                                onClick={() => {
                                    alert(' DELETE USER FUNCTION');
                                }}>
                                Yes
                            </Button>
                        </>
                    ) : (
                        <>
                            <>
                                <Button
                                    onClick={() => {
                                        alert(' BAN CANCEL');
                                    }}>
                                    No
                                </Button>
                                <Button
                                    onClick={() => {
                                        alert(' BAN USER FUNCTION');
                                    }}>
                                    Yes
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
