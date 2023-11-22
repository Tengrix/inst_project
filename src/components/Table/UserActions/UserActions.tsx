import { useTranslations } from 'next-intl';
import React, { ReactNode, useEffect } from 'react';

import { useDeletePostMutation } from '@/api/api';
import { useAppDispatch } from '@/redux/store';

import s from './styles.module.scss';

type UserActionsPropsType = {
    id?: string;
};

type AdminActionsType = {
    title: string;
    icon: ReactNode;
    onClick?: () => void;
};
const UserActions = (props: UserActionsPropsType) => {
    const t = useTranslations('');
    const adminActions: AdminActionsType[] = [
        {
            title: t('button.removeUser'),
            icon: <span className="icon_personRemove"></span>,
            onClick: () => {} //modal
        },
        {
            title: t('button.banInTheSystem'),
            icon: <span className="icon_Block"></span>,
            onClick: () => {} //modal
        },
        { title: t('button.moreInformation'), icon: <span className="icon_moreHorizotnal"></span>, onClick: () => {} }
    ];

    return (
        <div className={s.container}>
            {adminActions.map(action => (
                <div key={action.title} className={s.option} onClick={action.onClick}>
                    <div className={s.icon}>{action.icon}</div>
                    <div>{action.title}</div>
                </div>
            ))}
        </div>
    );
};

export default UserActions;
