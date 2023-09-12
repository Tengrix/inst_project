import React, { ReactNode } from 'react';

import { useDeletePostMutation } from '@/api/api';
import { useAppDispatch } from '@/redux/store';

import s from './styles.module.scss';

type Props = {
    id: string;
    editModeHandler?: () => void;
};

type MyPostOptionsType = {
    title: string;
    icon: ReactNode;
    onClick?: () => void;
    editModeHandler?: () => void;
};
const PostOptions = (props: Props) => {
    const [deletePost] = useDeletePostMutation();
    const myPostOptions: MyPostOptionsType[] = [
        { title: 'Edit Post', icon: <></>, onClick: () => (props.editModeHandler ? props?.editModeHandler() : null) },
        {
            title: 'Delete Post',
            icon: <></>,
            onClick: () => deletePost({ id: props.id })
        },
        { title: 'Copy Link', icon: <></> }
    ];

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
