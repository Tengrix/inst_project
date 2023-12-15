import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import React, { ReactNode, useState } from 'react';

import ActionWithUserModal from '@/components/ActionWithUserModal/ActionWithUserModal';
import { SelectBan } from '@/shared/ui/selectBan/SelectBan';

import s from './styles.module.scss';

type UserActionsPropsType = {
    userId: string;
};

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
    const router = useRouter();
    const t = useTranslations('');
    const [showModal, setIsShowModal] = useState<boolean>(false);
    const [activeActionId, setActiveActionId] = useState<string | null>(null);

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
            icon: <span className="icon_moreHorizontal"></span>,
            isShowModal: false,
            modalTitle: 'more information',
            children: <></>,
            callback: () => {
                console.log(props.userId);
                router.push('/admin/users/' + props.userId);
            }
        }
    ]);
    const handleActionClick = (action: AdminActionsType) => {
        if (action.id === 'MORE_INFORMATION') {
            console.log(props.userId);
            router.push('/admin/users/' + props.userId);
        } else {
            setActiveActionId(action.id);
            setIsShowModal(true);
        }
    };
    const getActiveAction = () => adminActions.find(action => action.id === activeActionId);

    return (
        <div className={s.container}>
            {adminActions.map(action => (
                <div key={action.title} className={s.option} onClick={() => handleActionClick(action)}>
                    <div className={s.icon}>{action.icon}</div>
                    <div>{action.title}</div>
                </div>
            ))}
            {showModal && activeActionId && (
                <ActionWithUserModal
                    id={getActiveAction()?.id || ''}
                    open={showModal}
                    modalHandler={setIsShowModal}
                    modalTitle={getActiveAction()?.modalTitle || ''}>
                    {getActiveAction()?.children}
                </ActionWithUserModal>
            )}
        </div>
    );
};

export default UserActions;
