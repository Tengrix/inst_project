import { useTranslations } from 'next-intl';
import React, { ReactNode, useState } from 'react';

import ActionWithUserModal from '@/components/ActionWithUserModal/ActionWithUserModal';
import { SelectBan } from '@/shared/ui/selectBan/SelectBan';

import s from './styles.module.scss';

type UserActionsPropsType = {};

type AdminActionsType = {
    id: string;
    title: string;
    icon: ReactNode;
    isShowModal: boolean;
    modalTitle: string;
    children: ReactNode;
    callback?: () => void;
};
const UserActions = (props: UserActionsPropsType) => {
    const t = useTranslations('');
    const [showModal, setIsShowModal] = useState<boolean>(false);

    const [adminActions, setAdminActions] = useState<AdminActionsType[]>([
        {
            id: 'REMOVE_USER',
            title: t('button.removeUser'),
            icon: <span className="icon_personRemove"></span>,
            isShowModal: false,
            modalTitle: t('button.removeUser'),
            children: <h1>{t('modal.areYouSureToDelete')}</h1>,
            callback: () => {}
        },
        {
            id: 'BAN_USER',
            title: t('button.banInTheSystem'),
            icon: <span className="icon_Block"></span>,
            isShowModal: false,
            modalTitle: t('modal.banUser'),
            children: (
                <>
                    <h1>{t('modal.areYouSureToBan')}</h1>
                    <SelectBan />
                </>
            ),
            callback: () => {}
        },
        {
            id: 'MORE_INFORMATION',
            title: t('button.moreInformation'),
            icon: <span className="icon_moreHorizotnal"></span>,
            isShowModal: false,
            modalTitle: 'more information',
            children: <></>,
            callback: () => {}
        }
    ]);

    return (
        <div className={s.container}>
            {adminActions.map(action => {
                const show = (id: string) => {
                    const newAdminActions = adminActions.map(el =>
                        el.id === id && el.id !== 'MORE_INFORMATION'
                            ? { ...el, isShowModal: true }
                            : { ...el, isShowModal: false }
                    );
                    setAdminActions(newAdminActions);
                    setIsShowModal(true);
                };

                return (
                    <div key={action.title} className={s.option} onClick={() => show(action.id)}>
                        <div className={s.icon}>{action.icon}</div>
                        <div>{action.title}</div>
                        {showModal && action.isShowModal && (
                            <ActionWithUserModal
                                id={action.id}
                                open={action.isShowModal}
                                modalHandler={setIsShowModal}
                                modalTitle={action.modalTitle}>
                                {action.children}
                            </ActionWithUserModal>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default UserActions;
