import { Select } from '@radix-ui/react-select';
import { useTranslations } from 'next-intl';
import React, { ReactNode, useState } from 'react';

import ActionWithUserModal from '@/components/ActionWithUserModal/ActionWithUserModal';
import { Modal } from '@/shared/ui/modal/Modal';

import s from './styles.module.scss';

type UserActionsPropsType = {
    id?: string;
    editModeHandler?: () => void;
    editPostModeHandler?: () => void;
};

type AdminActionsType = {
    title: string;
    icon: ReactNode;
    modalTitle?: string;
    children: ReactNode;
    onClick?: () => void;
};
const UserActions = (props: UserActionsPropsType) => {
    const t = useTranslations('');
    const [isBanUserModal, setIsBanUserModal] = useState(false);
    const [isDeleteUserModal, setIsDeleteUserModal] = useState(false);
    const [editPost, setEditPost] = useState<boolean>(false);
    const [showModal, setIsShowModal] = useState<boolean>(false);

    const adminActions: AdminActionsType[] = [
        {
            title: t('button.removeUser'),
            icon: <span className="icon_personRemove"></span>,
            modalTitle: t('button.removeUser'),
            children: <Select />,
            onClick: () => {
                setIsShowModal(true);
            } //modal
        },
        {
            title: t('button.banInTheSystem'),
            icon: <span className="icon_Block"></span>,
            modalTitle: t('modal.banUser'),
            children: 'ban children',
            onClick: () => {
                setIsShowModal(true);
            } //modal
        },
        {
            title: t('button.moreInformation'),
            icon: <span className="icon_moreHorizotnal"></span>,
            modalTitle: 'sdfsdfsdf',
            children: 'delete children',
            onClick: () => {}
        }
    ];

    return (
        <div className={s.container}>
            {adminActions.map(action => {
                return (
                    <div key={action.title} className={s.option} onClick={action.onClick}>
                        <div className={s.icon}>{action.icon}</div>
                        <div>{action.title}</div>
                    </div>
                );
            })}

            {showModal && (
                <ActionWithUserModal open={showModal} modalHandler={setIsShowModal} modalTitle={'modalTitle'}>
                    {'modalTitle'}
                </ActionWithUserModal>
            )}
        </div>
    );
};

export default UserActions;
