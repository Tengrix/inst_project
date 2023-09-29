import Image from 'next/image';
import React from 'react';

import github from 'public/assets/gitHub.png';

import styles from './styles.module.scss';

type Props = {
    image: string;
    width: number;
    height: number;
};

export const Avatar = ({ image, width, height }: Props) => {
    return (
        <div className={styles.avatar}>
            {image ? (
                <Image key={'UserAva'} alt={'UserAva'} src={image} width={width} height={height} />
            ) : (
                <Image src={github} alt={'Avatar'} width={width} height={height} />
            )}
        </div>
    );
};
