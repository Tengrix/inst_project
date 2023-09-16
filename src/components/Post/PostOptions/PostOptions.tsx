import { useTranslations } from 'next-intl';
import React, { ReactNode, useEffect } from 'react';

import { useDeletePostMutation } from '@/api/api';
import { useAppDispatch } from '@/redux/store';

import s from './styles.module.scss';

type Props = {
    id: string;
    editModeHandler?: () => void;
    editPostModeHandler?: () => void;
};

type MyPostOptionsType = {
    title: string;
    icon: ReactNode;
    onClick?: () => void;
};
const PostOptions = (props: Props) => {
    const t = useTranslations('');
    const [deletePost, { isSuccess }] = useDeletePostMutation();
    const myPostOptions: MyPostOptionsType[] = [
        {
            title: t('button.editPost'),
            icon: <span className="icon_editOutline"></span>,
            onClick: () => (props.editModeHandler ? props.editModeHandler() : null)
        },
        {
            title: t('button.deletePost'),
            icon: <span className="icon_trashOutline"></span>,
            onClick: () => deletePost({ id: props.id })
        },
        { title: t('button.copyLink'), icon: <span className="icon_copyOutline"></span> }
    ];

    useEffect(() => {
        if (isSuccess) {
            props.editPostModeHandler ? props.editPostModeHandler() : null;
        }
    }, [isSuccess]);

    return (
        <div className={s.container}>
            {myPostOptions.map(option => (
                <div key={option.title} className={s.option} onClick={option.onClick}>
                    <div className={s.icon}>{option.icon}</div>
                    <div>{option.title}</div>
                </div>
            ))}
        </div>
    );
};

export default PostOptions;
