import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useGetUserDataQuery } from '@/api/api';
import { AddToFavIcon } from '@/assets/icons/AddToFavIcon';
import { CommentsIcon } from '@/assets/icons/CommentsIcon';
import { HeartIcon } from '@/assets/icons/HeartIcon';
import { ShareIcon } from '@/assets/icons/ShareIcon';
import PostOptions from '@/components/Post/PostOptions/PostOptions';
import { PostType } from '@/components/Post/types';
import styles from '@/components/profileSettings/general-information/styles.module.scss';
import { Button } from '@/shared/ui/button';
import CustomPopover from '@/shared/ui/popover/Popover';
import Spinner from '@/shared/ui/spinner/Spinner';
import { Typography } from '@/shared/ui/typography';
import { HorizontalDotsIcon } from 'public/assets/icons/HorizontalDotsIcon';
import s from 'src/components/Post/styles.module.scss';

import { ImagePostSlider } from '../ImageSlider/ImagePostSlider';
import TimesAgoFormatter from '../TimesAgoFormatter/TimesAgoFormatter';

const noAvatarUrl =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXGxsb////JycnDw8Pv7+/8/Pza2trNzc3g4ODy8vLm5ub4+PjV1dXj4+Pr6+vp6ekuEkSCAAADOElEQVR4nO3cW3OrIBSGYXSpeIr+/3+7RZumnaSpix2Di75PLzqdyQVfOQgIcQ4AAAAAAAAAAAAAAAAAAAAAAAA4Tpm6AEeTq9QFOYRIOTZtX1XTpR29yy2kiG+7urgZpjGnkOKarrhTzz6XjNIMa6L7kFMWGcU/qL/PerxsnzE7xi41JO2DuvuiM1+N89N8oRpHyxHFPWmhnxqrEUPf2hPQbkRxUu0KaDZiKfPDR8QjPnVho0izswYXQ+rCRil31t9qNthOZVIELIoxdXn1RlXAYjBXibvHUauVKF4ZsOiMVaKyFwbWJqiagXTT20qoHGcCW2ON9PqEhalFogwRCZvUpVbRd0NjHdHHJKwsJYwYaIwNNYplxU1tKKFm4UTCc/oDCbMfafQri8DU0yL/J37crM1Uwuxn3jGTGktD6UL0CS/GEv76zumOtV0Mv3dD/8raTlT+u4nqaU2XusB62l19a43UKdf5k8GAqgVGbfP40P52WpsbZlay9zW+sRnpTZhm7puAtzYDbvZENB3QuV8f/LXRJroJDbV9Em75GcIxDMsZF/5ZS+1Tl+4lpB3uD9asf1fW1hM/EdcM9/nqPE6XfhDxl28Px7pqSsns6L5I6Zt+mqpp7jM8yf5BxOV7GeGvyKvjAQCAh+Tbr8zI7YpsHlPTLwnWPH5s+7nq6mAYumoOV2VNJ90moEuAcmynH7dN625ufOk+c9qatoabzW21YzdxjemM1ebS+pZ0u97M1Nunhn5Z85sJKW6cYs7TdK3fQp64sa5dKi7eZriGPKuw4RRzVmiz/WO6sEV1UiKPrt1HJO23bcazBb3fFP0PYav4bFfY5YX5rhnPRMbX5itCWz1RM5Xfb91HZRzPMq4eUIEfpnMMq3I5KN9iOENvjLhpqJD6OyVCI9KeX9MKEVM+N6TSnkFUqhMfRYk67azNmPQLF6LuVWil/MIF1dcmxEt3TeHI58Q3ydrpm6qwTlaJcfe3YhKm6onqo9zxUp3OPGo6ei/R4b43dcMgUUcs3xYw1cW9/BO67BPmX4ckJCEJSUhCEpKQhC+V6hp0+T6nfrkPAAAAAAAAAAAAAAAAAAAAAAAAvNc/BaMjNJZwCScAAAAASUVORK5CYII=';
type Props = {
    post: PostType;
};
const Post = (props: Props) => {
    const t = useTranslations('');
    const { data: userData } = useGetUserDataQuery();
    const { image, likes, description, id, updatedAt } = props.post;

    if (!userData) {
        return <Spinner />;
    }
    return (
        <div className={s.container}>
            <div className={s.header}>
                <Image src={userData.photo ? userData.photo : noAvatarUrl} alt="userAva" width={50} height={50} />
                <Typography variant={'h1'}>{`${userData.firstName} ${userData.lastName}`}</Typography>
                <TimesAgoFormatter date={updatedAt} />
                <CustomPopover
                    icon={
                        <div>
                            <HorizontalDotsIcon />
                        </div>
                    }
                    contentChildren={<PostOptions id={id} />}
                />
            </div>
            <div className={s.photo}>
                <ImagePostSlider images={image} />
            </div>
            <div className={s.icons}>
                <HeartIcon />
                <CommentsIcon />
                <ShareIcon />
                <AddToFavIcon />
            </div>
            <div className={s.description}>
                <Image src={userData.photo ? userData.photo : noAvatarUrl} alt="userAva" width={50} height={50} />
                <div style={{ display: 'inline-block', wordWrap: 'break-word', maxWidth: '400px' }}>
                    <Typography
                        as={'span'}
                        variant={'bold14'}>{`${userData.firstName} ${userData.lastName} `}</Typography>
                    <Typography as={'span'} variant={'regular14'}>
                        {description}
                    </Typography>
                </div>
            </div>
            <Typography variant={'regular14'}>
                {likes}{' '}
                <Typography as={'span'} variant={'bold14'}>
                    {t('post.like')}
                </Typography>
            </Typography>
            <Typography variant={'bold14'} color={'form'}>
                {t('post.viewAllcomments')}
            </Typography>
            <div className={s.newComment}>
                {t('post.addComment')}
                <Button variant={'link'}>{t('button.publish')}</Button>
            </div>
            <div className={styles.line}></div>
        </div>
    );
};

export default Post;
