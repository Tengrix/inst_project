import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { useEditPostMutation } from '@/api/api';
import { EditPostTypes } from '@/components/Post/EditPost/types';
import PostOptions from '@/components/Post/PostOptions/PostOptions';
import { Modal } from '@/shared/ui/modal/Modal';
import CustomPopover from '@/shared/ui/popover/Popover';
import Spinner from '@/shared/ui/spinner/Spinner';
import { TextArea } from '@/shared/ui/text-area';
import { Typography } from '@/shared/ui/typography';
import noAvatar from 'public/assets/noAvatar.png';

import { HorizontalDotsIcon } from '../../../../public/assets/icons/HorizontalDotsIcon';

import s from './styles.module.css';

const EditPost = ({ edit, editPostModeHandler, post, user, isLoading, isSuccess }: EditPostTypes) => {
    const [confirmPostEditing, { isSuccess: isEditPostSuccess, isLoading: editPostLoading }] = useEditPostMutation();
    const [newPost, setNewPost] = useState<string>(post?.description);
    const [editPost, setEditPost] = useState<boolean>(false);

    useEffect(() => {
        setEditPost(false);
    }, [editPostLoading]);
    const submitEditedPost = () => {
        const editedPost = {
            description: newPost,
            files: post.image[0],
            id: post.id
        };
        confirmPostEditing(editedPost);
    };
    const editModeHandler = () => setEditPost(true);
    const content = (
        <div className={s.wrapper}>
            {post ? (
                <>
                    <div>
                        <Image alt={''} src={post.image[0]} width={800} height={800} />
                    </div>
                    <div className={s.content}>
                        <div>
                            <div className={s.contentHeader}>
                                <div className={s.header}>
                                    <Image
                                        className={s.userAvatar}
                                        alt={''}
                                        src={user.photo ? user.photo : noAvatar}
                                        width={40}
                                        height={40}
                                    />
                                    <span className={s.userName}>{user.login}</span>
                                </div>
                                <CustomPopover
                                    icon={
                                        <div>
                                            <HorizontalDotsIcon />
                                        </div>
                                    }
                                    contentChildren={
                                        <PostOptions
                                            id={post.id}
                                            editPostModeHandler={editPostModeHandler}
                                            editModeHandler={editModeHandler}
                                        />
                                    }
                                />
                            </div>
                            {!editPost ? (
                                <div className={s.contentComments}>
                                    <span style={{ fontWeight: 'bold', marginRight: '12px' }}>{user.login}</span>
                                    <span>{post.description}</span>
                                </div>
                            ) : (
                                <TextArea
                                    className={s.textFieldEdit}
                                    value={newPost}
                                    onChange={e => setNewPost(e.target.value)}
                                />
                            )}
                        </div>
                        {!editPost ? (
                            <div>
                                <Typography variant={'regular14'}>
                                    {post.likes}{' '}
                                    <Typography as={'span'} variant={'bold14'}>
                                        Like
                                    </Typography>
                                </Typography>
                                <div>add comment</div>
                            </div>
                        ) : null}
                    </div>
                </>
            ) : null}
        </div>
    );
    return (
        <Modal open={edit} modalHandler={editPostModeHandler} editPost={editPost} onSubmit={submitEditedPost}>
            {!isLoading ? content : <Spinner />}
        </Modal>
    );
};

export default EditPost;
